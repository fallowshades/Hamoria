import { StatusCodes } from 'http-status-codes'
import orientationModel from '../models/orientationModel.js'
import 'express-async-errors'
import { readFile } from 'fs/promises'
import { nanoid } from 'nanoid'

export const createOrientation = async (req, res) => {
  res.send('create orientation')
}

export const getAllOrientations = async (req, res) => {
  const jsonPrefix = JSON.parse(
    await readFile(
      new URL('../utils/mockWhat/mockOrientationData.json', import.meta.url)
    )
  )

  const packagedData = jsonPrefix.map((keyless) => {
    return { ...keyless, _id: nanoid() }
  })

  res.status(StatusCodes.OK).json({ orientations: packagedData })
}

export const getSingleOrientation = async (req, res) => {
  const testItem = {
    Connectionid: req.noRead ? '1' : req.value,
    position: 'mouth',
    hand: 'j',
  }
  res.status(StatusCodes.OK).json({ prefix: testItem })
}

export const updateOrientation = async (req, res) => {
  getSinglePrefix({ noRead: false, value: nanoid() }, res)
}

export const deleteOrientation = async (req, res) => {
  getSinglePrefix({ noRead: false, value: nanoid() }, res)
}
