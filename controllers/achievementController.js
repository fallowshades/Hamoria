import Achievement from '../models/achievementModel.js'
import 'express-async-errors'
import { NotFoundError } from '../errors/customErrors.js'
import { StatusCodes } from 'http-status-codes'

export const getAllAchievements = async (req, res) => {
  const achievements = await Achievement.find({})
  res.status(StatusCodes.CREATED).json({ achievements })
}

export const createAchievement = async (req, res) => {
  const achievement = await Achievement.create(req.body)
  res.status(StatusCodes.CREATED).json({ achievement })
}

export const getAchievement = async (req, res) => {
  const { id } = req.params
  const achievement = await Achievement.findById(id)
  if (!achievement) {
    throw new NotFoundError('no achievement with that id')
  }
  res.status(StatusCodes.OK).json({ achievement })
}

export const updateAchievement = async (req, res) => {
  const { id } = req.params

  const updatedAchievement = await Achievement.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  if (!updatedAchievement) {
    return res.status(404).json({ msg: `no achievement with id ${id}` })
  }

  res.status(StatusCodes.OK).json({ description: updatedAchievement })
}

export const deleteAchievement = async (req, res) => {
  const { id } = req.params
  const removedAchievement = await Achievement.findByIdAndDelete(id)

  if (!removedAchievement) {
    return res.status(404).json({ msg: `no achievement with id ${id}` })
  }
  res.status(StatusCodes.OK).json({ achievement: removedAchievement })
}
