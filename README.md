#

## testing purpose

### review model

#### value (equation scalar)

reviewModel.js

```js
const mongoose = require(mongoose)

const ReviewSchema = mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please provide rating'],
  },
})
```

#### form text input

```js
const ReviewSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please provide review title'],
  },

  comment: {
    type: String,
    required: [true, 'Please provide review text'],
  },
})
```

#### binding to user and products

```js

const ReviewSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    }
    {timestamp: true}
})

```

#### unique validator index (who is review like color)

```js
const ReviewSchema = mongoose.Schema({...})

ReviewSchema.index({ product: 1, user: 1 }, { unique: true })
```

### routes

#### commonJS --> modules

-- export before const

reviewController.js

```js
import mongoose from 'mongoose'

const createReview = async (req, res) =>{
    res.send('create reviews)
}
const getAllReviews = async (req, res) =>{
    res.send('get all reviews)
}
const getSingleReview = async (req, res) =>{
    res.send('get single reviews)
}
const updateReview = async (req, res) =>{
    res.send('update reviews)
}
const deleteReview = async (req, res) =>{
    res.send('delete reviews)
}

export default mongoose.model('review', ReviewSchema)

/*
module.exports = {
    createReview, getAllReviews, getSingleReview, updateReview, deleteReview
}
*/

```

reviewRouter.js --> modules

```js
const express = require('express')
const router = express.Router()

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController')
const { authenticateUser } = require('../middleware/authMiddleware')

//-->modules
import { Router } from 'express'
const router = Router()
import { authenticateUser } from '../middleware/authMiddleware.js'

import {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js'

router.route('/').post(authenticateUser, createReview).get(getAllReviews)

router
  .route('/:id')
  .get(getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview)
```

app.js

```js
import reviewRouter from './routes/reviewRouter.js'

app.use('/api/v1/reviews', reviewRouter)
```

test postman

## crud

### creat

#### dependencies from user exept utils

commonJS --> modules

```js
const { StatusCodes } = require('http-status-codes')
const customError = require('../errors')

import { StatusCodes } from 'http-status-codes'
import Review from '../models/reviewModel.js'
import 'express-async-errors'
```

#### create with bind dependency (search semantic)

```js
const createReview = async (req, res) => {
  const { product: productId } = req.body

  req.body.user = req.user.userId
  const review = await Review.create(req.body)
  res.status(StatusCodes.CREATED).json({ review })
}
```

#### validation

```js
const createReview = async (req, res) => {
    ...
        const isValid = await Product.findOne({_id: productId})

        if(!isValidProduct){
            throw new CustomError.NotFoundError(`No product with id: ${productId}`)
        }
    ...
}
```

test

```json
{
  "product": "6553667dd025a6b567cdc7cb",
  "rating": 1,
  "title": "bad product",
  "comment": "very. very bad product"
}
```

#### create +1 alternative .unique custom validation

```js
const alreadySubmitted = await Review.findOne({
  product: productId,
  user: req.user.userId,
})

if (alreadySubmitted) {
  throw new CustomError.BadRequestError(
    'Already submitted review for this product'
  )
}
```

#### refracture validation in controller to sing and review middleware

-remove the coupling customErrors and sign model from reviewController

validateSignMiddleware.js

```js
export const validateNonPrimaryKey = withValidationErrors([
  body('product').custom(async (productId) => {
    console.log(productId)

    const isValidId = mongoose.Types.ObjectId.isValid(productId)
    if (!isValidId) throw new BadRequestError('invalid MongoDB id')
    const isValidSign = await Sign.findOne({ _id: productId })
    if (!isValidSign) throw new NotFoundError(`no sign with id : ${value}`)
  }),
])
```

---

validateReviewMiddleware.js

```js
import { body, validationResult } from 'express-validator'
import { BadRequestError, NotFoundError } from '../errors/customErrors.js'
import Review from '../models/reviewModel.js'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)

        if (errorMessages[0].startsWith('no review')) {
          throw new NotFoundError(errorMessages)
        }

        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}

export const validateReviewInput = withValidationErrors([
  body('product').notEmpty().withMessage('product is required'),
  body('rating').notEmpty().withMessage('rating is required'),
  body('title').notEmpty().withMessage('invalid category value'),
  body('comment').notEmpty().withMessage('comment is required'),
])

export const validateAlreadySubmittedNotPrimary = async (req, res, next) => {
  const { product: productId } = req.body

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  })

  if (alreadySubmitted) {
    throw new BadRequestError('Already submitted review for this product')
  }

  next()
}
```

---

reviewRouter.js

```js
import { validateNonPrimaryKey } from '../middleware/validateSignMiddleware.js'
import {
  validateReviewInput,
  validateAlreadySubmittedNotPrimary,
} from '../middleware/validateReviewMiddleware.js'
router.route('/').post(
  authenticateUser,
  validateReviewInput,
  validateNonPrimaryKey,
  validateAlreadySubmittedNotPrimary,

  createReview
)
```

### read id consideration

```js
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
}

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params

  const review = await Review.findOne({ _id: reviewId })

  /*
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${reviewId}`)
  }
  */

  res.status(StatusCodes.OK).json({ review })
}
```

reviewRouter.js

```js
import {
  ...
  ,
  validateIdParam,
} from '../middleware/validateReviewMiddleware.js'

router
  .route('/:id')
  ...
  .get(validateIdParam, getSingleReview)

```

validateReviewMiddleware.js

```js
import mongoose from 'mongoose'
import { param } from 'express-validator'

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)
    if (!isValidId) throw new BadRequestError('invalid MongoDB id')
    const sign = await Review.findById(value)
    if (!sign) throw new NotFoundError(`No review with id ${value}`)
  }),
])
```

### delete

#### cpy get single review

copy get Single review

```js
const { checkPermissions } = //require('../utils')
```

#### util permission

utils/checkPermissions.js

```js
//const CustomError = require('../errors')

export const checkPermissions = (requestUser, resourceUserId) => {
  // console.log(requestUser);
  // console.log(resourceUserId);
  // console.log(typeof resourceUserId);
  if (requestUser.role === 'admin') return
  if (requestUser.userId === resourceUserId.toString()) return
  throw new CustomError.UnauthorizedError('Not authorized to access this route')
}

//module.exports = chechPermissions
```

#### check before delete

```js
checkPermissions(req.user, review.user)
await review.remove()
res.status(StatusCodes.OK).json({ msg: 'Successs! Review removed' })
```

### update

#### access

```js
const updateReview = async (req, res) => {
  const { id: reviewId } = req.params
  const { rating, title, comment } = req.body

  const review = await Review.findOne({ _id: reviewId })
  /*
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${reviewId}`)
  }
*/
  res.status(StatusCodes.OK).json({ review })
}
```

#### update new values

```js
checkPermissions(req.user, review.user)

review.rating = rating
review.title = title
review.comment = comment

await review.save()
```

reviewRouter

```js
.patch(authenticateUser, validateIdParam, updateReview)
```

## populate method

### update avrage tracking

#### populate

--concider product must be true

reviewController.js

```js
export const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})
    .populate({
      path: 'signs',
      select: 'name company price',
    })
    .populate({ path: 'user', select: 'name' })
}
```

#### virtuals

signModel.js

```js
SignSchema.virtual('reviews', {
  ref: 'review',
  localField: '_id',
  foreignField: 'sign',
  justOne: false,
})
```

signController

```js
const sign = await Sign.findById(id).populate('reviews')
```

#### target interval

-can analys

```js
matcch: {
  rating: 5
}
```

## trigger buissiness rules

### manage dynamic extention

#### single sign and review

reviewController.js

```js
export const getSingleProductReviews = async (req, res) => {
  const { id: signId } = req.params

  const reviews = await Review.find({ sign: signId })
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
}
```

reviewRouter.js

```js
import {
  ...,
  getSingleProductReview } from ''

router.route('/:id/reviews').get(getSingleProductReview)
```

#### delete all review

signModel.js

```js
SignSchema.pre('remove', async function (next) {
  await this.model('review').deleteMany({ sign: this._id })
})
```
