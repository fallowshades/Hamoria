import { body, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/customErrors.js'
import { ORIENTATION } from '../utils/constants.js'

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

export const validateOrientationInput = withValidationErrors([
  body('fingerdirection')
    .isIn(Object.values(ORIENTATION))
    .withMessage('invalid fingerdirection value'),
  body('fingerdirection2')
    .isIn(Object.values(ORIENTATION))
    .withMessage('invalid fingerdirection2 value'),
  body('palmdirection')
    .isIn(Object.values(ORIENTATION))
    .withMessage('invalid palmdirection value'),
  body('palmdirection2')
    .isIn(Object.values(ORIENTATION))
    .withMessage('invalid palmdirection2 value'),
])
