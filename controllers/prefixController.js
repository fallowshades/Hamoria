import { StatusCodes } from 'http-status-codes'
import Prefix from '../models/prefixModel.js'
import 'express-async-errors'

export const createPrefix = async (req, res) => {
  const { Connectionid, position, hand } = req.body
  const prefix = await Prefix.create(req.body)
  res.status(StatusCodes.OK).json({ prefix })
}

export const getAllPrefixes = async (req, res) => {
  const prefix = await Prefix.find({})
  res.status(StatusCodes.OK).json({ prefixes: prefix })
}

export const getSinglePrefix = async (req, res) => {
  const { id } = req.params
  const prefix = await Prefix.findById(id)
  if (!prefix) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'no prefix with id' })
  }
  res.status(StatusCodes.OK).json({ prefix })
}

export const updatePrefix = async (req, res) => {
  const { id } = req.params

  const updatedPrefix = await Prefix.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  if (!updatedPrefix) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `no reference with id ${id}` })
  }
  res.status(StatusCodes.OK).json({ updatedPrefix })
}

export const deletePrefix = async (req, res) => {
  const { id } = req.params
  const removedPrefix = await Prefix.findByIdAndDelete(id)

  res.status(StatusCodes.OK).json({ removedPrefix })
}
