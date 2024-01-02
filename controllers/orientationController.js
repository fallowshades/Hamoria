import { StatusCodes } from 'http-status-codes'
import Orientation from '../models/orientationModel.js'
import 'express-async-errors'

import { readLocalFile } from '../utils/mockWhat/localRead.js/orientationUtil.js'
export const createOrientation = async (req, res) => {
  const {
    orderid,
    fingerdirection,
    fingerdirection2,
    palmdirection,
    palmdirection2,
  } = req.body
  const orientation = await Orientation.create(req.body)
  res.status(StatusCodes.OK).json({ orientation })
}

export const getAllOrientations = async (req, res) => {
  const {
    orderid,
    fingerdirection,
    fingerdirection2,
    palmdirection,
    palmdirection2,
    sort,
  } = req.body

  const queryObject = {}

  if (fingerdirection && fingerdirection !== 'all') {
    queryObject.fingerdirection = fingerdirection
  }
  if (fingerdirection2 && fingerdirection2 !== 'all') {
    queryObject.fingerdirection2 = fingerdirection2
  }
  if (palmdirection && palmdirection !== 'all') {
    queryObject.palmdirection = palmdirection
  }
  if (palmdirection2 && palmdirection2 !== 'all') {
    queryObject.palmdirection2 = palmdirection2
  }

  const sortOptions = {
    'a-z': 'fingerdirection',
    'z-a': '-fingerdirection',
  }

  const sortKey = sortOptions[sort] || sortOptions['a-z']
  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  //const packagedData = await readLocalFile('../mockOrientationData.json')

  const orienetation = await Orientation.find({})
    .sort(sortKey)
    .skip(skip)
    .limit(limit)

  const totalOrientations = await Orientation.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalOrientations / limit)

  res.status(StatusCodes.OK).json({
    totalOrientations,
    numOfPages,
    currentPage: page,
    orientations: orienetation,
  })
}

export const getSingleOrientation = async (req, res) => {
  const { id } = req.params
  const orientation = await Orientation.findById(id)
  if (!orientation) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: 'no orientation with id' })
  }
  res.status(StatusCodes.OK).json({ orientation })
}

export const updateOrientation = async (req, res) => {
  const { id } = req.params

  const updatedOrientation = await Orientation.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  if (!updatedOrientation) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `no reference with id ${id}` })
  }
  res.status(StatusCodes.OK).json({ updatedOrientation })
}

export const deleteOrientation = async (req, res) => {
  const { id } = req.params
  const removedOrientation = await Orientation.findByIdAndDelete(id)

  res.status(StatusCodes.OK).json({ removedOrientation })
}
