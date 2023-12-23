import { body, validationResult } from 'express-validator'
import { BadRequestError, NotFoundError } from '../errors/customErrors.js'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)
        if (errorMessages[0].startsWith('no prefix')) {
          throw new NotFoundError(errorMessages)
        }
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

import mongoose from 'mongoose'
import { param } from 'express-validator'
import Prefix from '../models/prefixModel.js'

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)
    if (!isValidId) throw new BadRequestError('invalid MongoDB id')
    const prefix = await Prefix.findById(value)
    if (!prefix) throw new NotFoundError(`no prefix with id : ${value}`)
  }),
])
