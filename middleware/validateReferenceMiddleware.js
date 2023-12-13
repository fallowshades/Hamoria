import { body, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/customErrors.js'
import { POSITION, TOUCH_TYPE, FACE_EXPRESSION } from '../utils/constants.js'

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

export const validateReferenceInput = withValidationErrors([
  body('position')
    .isIn(Object.values(POSITION))
    .withMessage('invalid position value'),
  body('bodycontact')
    .isIn(Object.values(POSITION))
    .withMessage('invalid bodycontact value'),
  body('touchtype')
    .isIn(Object.values(TOUCH_TYPE))
    .withMessage('invalid touch type'),
  body('faceexpression')
    .isIn(Object.values(FACE_EXPRESSION))
    .withMessage('invalid face expression'),
])
