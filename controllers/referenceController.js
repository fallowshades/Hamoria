import { StatusCodes } from 'http-status-codes'
import referenceModel from '../models/referenceModel.js'
import 'express-async-errors'

import { readFile } from 'fs/promises'
import { nanoid } from 'nanoid'

export const createReference = async (req, res) => {
  res.send('create reference')
}

export const getAllReferences = async (req, res) => {
  const jsonPrefix = JSON.parse(
    await readFile(
      new URL('../utils/mockWhat/mockReferenceData.json', import.meta.url)
    )
  )

  const packagedData = jsonPrefix.map((keyless) => {
    return { ...keyless, _id: nanoid() }
  })

  res.status(StatusCodes.OK).json({ references: packagedData })
}

export const getSingleReference = async (req, res) => {
  res.send('get single reference')
}

export const updateReference = async (req, res) => {
  getAllReferences({ noRead: false, value: nanoid() }, res)
}

export const deleteReference = async (req, res) => {
  getAllReferences({ noRead: false, value: nanoid() }, res)
}
