import { body, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/customErrors.js'

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

import { PREFIX_POSITION, HAND_VARIANTS } from '../utils/constants.js'

export const validatePrefixInput = withValidationErrors([
  body('position')
    .isIn(Object.values(PREFIX_POSITION))
    .withMessage('invalid position value'),
  body('hand')
    .isIn(Object.values(HAND_VARIANTS))
    .withMessage('invalid hand value'),
])
