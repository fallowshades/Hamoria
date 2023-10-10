import Achievement from '../models/achievementModel.js'
import 'express-async-errors'
import { NotFoundError } from '../errors/customErrors.js'
import { StatusCodes } from 'http-status-codes'

import mongoose from 'mongoose'
import day from 'dayjs'

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

export const showStats = async (req, res) => {
  const defaultStats = {
    pending: 22,
    interview: 11,
    declined: 4,
  }

  let monthlyApplications = [
    {
      date: 'May 23',
      count: 12,
    },
    {
      date: 'Jun 23',
      count: 9,
    },
    {
      date: 'Jul 23',
      count: 3,
    },
  ]
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}
