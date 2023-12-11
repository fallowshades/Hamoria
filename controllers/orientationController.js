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
  res.send('get single orientation')
}

export const updateOrientation = async (req, res) => {
  res.send('update orientation')
}

export const deleteOrientation = async (req, res) => {
  res.send('delete orientation')
}
