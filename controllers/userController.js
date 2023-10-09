import { StatusCodes } from 'http-status-codes'
import User from '../models/userModel.js'
import Achievement from '../models/achievementModel.js'

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  const userWithoutPassword = user.toJSON()
  res.status(StatusCodes.OK).json(userWithoutPassword)
}

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments()
  const achievement = await Achievement.countDocuments()
  res.status(StatusCodes.OK).json({ users, achievement })
}

export const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body)
  res.status(StatusCodes.OK).json({ msg: 'update user' })
}