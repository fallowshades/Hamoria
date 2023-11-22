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
