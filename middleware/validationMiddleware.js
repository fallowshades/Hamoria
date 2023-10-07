import { body, validationResult } from 'express-validator'
import { BadRequestError, NotFoundError } from '../errors/customErrors.js'
import { ACHIEVEMENT_STATUS, ACHIEVEMENT_TYPE } from '../utils/constants.js'

import mongoose from 'mongoose'
import { param } from 'express-validator'
import Achievement from '../models/achievementModel.js'
import User from '../models/userModel.js'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)
        if (errorMessages[0].startsWith('no achievement')) {
          throw new NotFoundError(errorMessages)
        }
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

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)
    if (!isValidId) throw new BadRequestError('invalid MongoDB id')
    const achievement = await Achievement.findById(value)
    if (!achievement)
      throw new NotFoundError(`no achievement with id : ${value}`)
  }),
])
export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email })
      if (user) {
        throw new BadRequestError('email already exists')
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
  body('location').notEmpty().withMessage('location is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
])
