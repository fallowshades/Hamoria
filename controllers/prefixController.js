import { StatusCodes } from 'http-status-codes'
import Prefix from '../models/prefixModel.js'
import 'express-async-errors'

export const createPrefix = async (req, res) => {
  const { Connectionid, position, hand } = req.body

  const prefix = await Prefix.create(req.body)
  res.status(StatusCodes.OK).json({ prefix })
}

export const getAllPrefixes = async (req, res) => {
  const { position, hand, sort } = req.body

  const queryObject = {}

  if (position && position !== 'all') {
    queryObject.position = position
  }
  if (hand && hand !== 'all') {
    queryObject.hand = hand
  }

  const sortOptions = {
    'a-z': 'hand',
    'z-a': '-hand',
  }

  const sortKey = sortOptions[sort] || sortOptions['a-z']
  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  const prefix = await Prefix.find({}).sort(sortKey).skip(skip).limit(limit)

  const totalPrefixes = await Prefix.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalPrefixes / limit)

  res
    .status(StatusCodes.OK)
    .json({ totalPrefixes, numOfPages, currentPage: page, prefixes: prefix })
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
