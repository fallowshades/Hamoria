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
  //const packagedData = await readLocalFile()
  const orienetation = await Orientation.find({})

  res.status(StatusCodes.OK).json({ orientations: orienetation })
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
