import { body, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/customErrors.js'

import mongoose from 'mongoose'
import { param } from 'express-validator'

import Review from '../models/reviewModel.js'

import { NotFoundError } from '../errors/customErrors.js'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)

        if (errorMessages[0].startsWith('no review')) {
          throw new NotFoundError(errorMessages)
        }

        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}
