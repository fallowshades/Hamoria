import Achievement from '../models/achievementModel.js'
import 'express-async-errors'

export const getAllAchievements = async (req, res) => {
  const achievement = await Achievement.find({})
  res.status(200).json({ achievement })
}

export const createAchievement = async (req, res) => {
  const { description } = req.body

  const achievement = await Achievement.create({ description })
  res.status(201).json({ achievement })
}

export const getAchievement = async (req, res) => {
  const { id } = req.params
  const achievement = await Achievement.findById(id)
  if (!achievement) {
    return res.status(404).json({ msg: `no achievement with id ${id}` })
  }
  res.status(200).json({ achievement })
}

export const updateAchievement = async (req, res) => {
  const { id } = req.params

  const updatedAchievement = await Achievement.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  if (!updatedAchievement) {
    return res.status(404).json({ msg: `no achievement with id ${id}` })
  }

  res.status(200).json({ description: updatedAchievement })
}

export const deleteAchievement = async (req, res) => {
  const { id } = req.params
  const removedAchievement = await Achievement.findByIdAndDelete(id)

  if (!removedAchievement) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }
  res.status(200).json({ achievement: removedAchievement })
}
