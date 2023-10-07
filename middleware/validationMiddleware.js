import { body, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/customErrors.js'
import { ACHIEVEMENT_STATUS, ACHIEVEMENT_TYPE } from '../utils/constants.js'

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

export const validateAchievementInput = withValidationErrors([
  body('description').notEmpty().withMessage('description is required'),
  body('status')
    .isIn(Object.values(ACHIEVEMENT_STATUS))
    .withMessage('invalid status value'),
  body('type')
    .isIn(Object.values(ACHIEVEMENT_TYPE))
    .withMessage('invalid type value'),
])
