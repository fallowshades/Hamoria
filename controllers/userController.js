import { StatusCodes } from 'http-status-codes'
import User from '../models/userModel.js'
import Achievement from '../models/achievementModel.js'

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  const userWithoutPassword = user.toJSON()
  res.status(StatusCodes.OK).json({ msg: 'get current user' })
}

export const getApplicationStats = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'application stats' })
}

export const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'update user' })
}
