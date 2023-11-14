import { body, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/customErrors.js'
import { SIGN_COMPANY, SIGN_CATEGORY } from '../utils/constants.js'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)
        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}

export const validateSignInput = withValidationErrors([
  body('title').notEmpty().withMessage('title is required'),
  body('description').notEmpty().withMessage('description is required'),
  body('category')
    .isIn(Object.values(SIGN_CATEGORY))
    .withMessage('invalid category value'),
  body('company')
    .isIn(Object.values(SIGN_COMPANY))
    .withMessage('invalid company type'),
])
