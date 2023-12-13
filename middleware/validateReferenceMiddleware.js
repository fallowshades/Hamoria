import { body, validationResult, param } from 'express-validator'
import { BadRequestError, NotFoundError } from '../errors/customErrors.js'
import { POSITION, TOUCH_TYPE, FACE_EXPRESSION } from '../utils/constants.js'

import mongoose from 'mongoose'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)
        if (errorMessages[0].startsWith('no reference')) {
          throw new NotFoundError(errorMessages)
        }
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
import Reference from '../models/referenceModel.js'

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)
    if (!isValidId) throw new BadRequestError('invalid MongoDB id')
    const reference = await Reference.findById(value)
    if (!reference) throw new NotFoundError(`no reference with id : ${value}`)
  }),
])
