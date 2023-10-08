import Achievement from '../models/achievementModel.js'
import 'express-async-errors'
import { NotFoundError } from '../errors/customErrors.js'
import { StatusCodes } from 'http-status-codes'

export const getAllAchievements = async (req, res) => {
  const achievements = await Achievement.find({ createdBy: req.user.userId })
  res.status(StatusCodes.OK).json({ achievements })
}

export const createAchievement = async (req, res) => {
  req.body.createdBy = req.user.userId
  const achievement = await Achievement.create(req.body)
  res.status(StatusCodes.CREATED).json({ achievement })
}

export const getAchievement = async (req, res) => {
  const { id } = req.params
  const achievement = await Achievement.findById(id)

  res.status(StatusCodes.OK).json({ achievement })
}

export const updateAchievement = async (req, res) => {
  const { id } = req.params

  const updatedAchievement = await Achievement.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  res.status(StatusCodes.OK).json({ description: updatedAchievement })
}

export const deleteAchievement = async (req, res) => {
  const { id } = req.params
  const removedAchievement = await Achievement.findByIdAndDelete(id)

  res.status(StatusCodes.OK).json({ achievement: removedAchievement })
}
