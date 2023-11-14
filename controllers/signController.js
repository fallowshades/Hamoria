import { nanoid } from 'nanoid'
import Sign from '../models/signModel.js'
import 'express-async-errors'

export const getAllSigns = async (req, res) => {
  const signs = await Sign.find({})
  res.status(200).json({ signs })
}

export const createSign = async (req, res) => {
  const { title, price, description, category, company, colors } = req.body
  const sign = await Sign.create({
    title,
    price,
    description,
    category,
    company,
    colors,
  })

  res.status(200).json({ sign })
}

export const getSign = async (req, res) => {
  const { id } = req.params
  const sign = await Sign.findById(id)
  if (!sign) {
    return res.status(404).json({ msg: `no sign with id ${id}` })
  }
  res.status(200).json({ sign })
}

export const updateSign = async (req, res) => {
  const { id } = req.params

  const updatedSign = await Sign.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  if (!updatedSign) {
    return res.status(404).json({ msg: `no sign with id ${id}` })
  }

  res.status(200).json({ description: updatedSign })
}

export const deleteSign = async (req, res) => {
  const { id } = req.params
  const removedSign = await Sign.findByIdAndDelete(id)

  if (!removedSign) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }
  res.status(200).json({ sign: removedSign })
}
