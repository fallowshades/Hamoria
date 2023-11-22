# review

##

### review model

#### value (equation scalar)

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
const ReviewSchema = mongoose.Schema({})
ReviewSchema.index({ product: 1, user: 1 }, { unique: true })
```

### routes

#### create

reviewRouter.js

```js

const createReview = async (req, res) =>{
    res.send('create reviews)
}
const createReview = async (req, res) =>{
    res.send('get all reviews)
}
const createReview = async (req, res) =>{
    res.send('get single reviews)
}
const createReview = async (req, res) =>{
    res.send('update reviews)
}
const createReview = async (req, res) =>{
    res.send('delete reviews)
}

module.exports = {
    createReview, getAllReviews, getSingleReview, updateReview, deleteReview
}

```

reviewRouter.js

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

router.route('/').post(authenticateUser, createReview).get(getAllReviews)

router.route('/:id').get(getSingleReview).patch(authenticateUser, updateReviews)
```

test postman

## util and db

### creat

#### dependencies from user exept utils

```js
const { StatusCodes } = require('http-status-codes')
const customError = require('../errors')
```

#### create with bind dependency (search semantic)

```js

const createReview = async (req, res) =>{
    const {product: productId} = req.body

    req.body.user = req.user.userId
    const review = aawait Review.create(req.body)
    res.status(StatusCodes.CREATED).json({review})
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

#### create alternative .unique custom validation

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

### read id consideration

```js
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
}

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params

  const review = await Review.findOne({ _id: reviewId })

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${reviewId}`)
  }

  res.status(StatusCodes.OK).json({ review })
}
```

### delete

#### cpy get single review

copy get Single review

```js
const { checkPermissions } = require('../utils')
```

#### util permission

utils/checkPermissions.js

```js
const CustomError = require('../errors')

const chechPermissions = (requestUser, resourceUserId) => {
  // console.log(requestUser);
  // console.log(resourceUserId);
  // console.log(typeof resourceUserId);
  if (requestUser.role === 'admin') return
  if (requestUser.userId === resourceUserId.toString()) return
  throw new CustomError.UnauthorizedError('Not authorized to access this route')
}

module.exports = chechPermissions
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

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${reviewId}`)
  }

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
