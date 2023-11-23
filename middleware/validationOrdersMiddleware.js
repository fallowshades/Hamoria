import { body, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/customErrors.js'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}

export const validateOrdersInput = withValidationErrors([
  body('items').isArray({ min: 1 }).withMessage('cartItems is required'),
  body('tax').notEmpty().withMessage('tax is required'),
  body('shippingFee').notEmpty().withMessage('shippingFee is required'),
])
