import { body, validationResult } from 'express-validator'
import { BadRequestError, NotFoundError } from '../errors/customErrors.js'
import { ORIENTATION } from '../utils/constants.js'

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

import mongoose from 'mongoose'
import { param } from 'express-validator'
import Orientation from '../models/orientationModel.js'

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)
    if (!isValidId) throw new BadRequestError('invalid MongoDB id')
    const orientation = await Orientation.findById(value)
    if (!orientation)
      throw new NotFoundError(`no orientation with id : ${value}`)
  }),
])
