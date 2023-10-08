import { StatusCodes } from 'http-status-codes'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import { hashPassword, comparePassword } from '../utils/passwordUtils.js'
import { UnauthenticatedError } from '../errors/customErrors.js'
import { createJWT } from '../utils/tokenUtils.js'

export const register = async (req, res) => {
  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments()) === 0
  req.body.role = isFirstAccount ? 'admin' : 'user'

  const hashedPassword = await hashPassword(req.body.password)
  req.body.password = hashedPassword

  const user = await User.create(req.body)
  res.status(StatusCodes.CREATED).json({ msg: 'user created' })
}
export const login = async (req, res) => {
  // check if user exists
  // check if password is correct

  const user = await User.findOne({ email: req.body.email })
  if (!user) throw new UnauthenticatedError('invalid credentials')

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password))

  if (!isValidUser) throw new UnauthenticatedError('invalid credentials')

  const token = createJWT({ userId: user._id, role: user.role })
  console.log(token)

  res.send('login route')
}
