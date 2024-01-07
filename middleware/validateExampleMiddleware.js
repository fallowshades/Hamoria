import { body, validationResult } from 'express-validator'
import { BadRequestError, NotFoundError } from '../errors/customErrors.js'
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

export const validateExampleInput = withValidationErrors([
  body('ordning').notEmpty().withMessage('ordning is required'),
  body('text').notEmpty().withMessage('text is required'),
  body('subsection').notEmpty().withMessage('subsection is required'),
])

import mongoose from 'mongoose'
import { param } from 'express-validator'
import Example from '../models/exampleModel.js'

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)
    if (!isValidId) throw new BadRequestError('invalid MongoDB id')
    const example = await Example.findById(value)
    if (!example) throw new NotFoundError(`no example with id : ${value}`)
  }),
])
