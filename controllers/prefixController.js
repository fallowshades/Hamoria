import { StatusCodes } from 'http-status-codes'
import PrefixModel from '../models/prefixModel.js'
import 'express-async-errors'

import { readFile } from 'fs/promises'
import dotenv from 'dotenv'
import { nanoid } from 'nanoid'

export const createPrefix = async (req, res) => {
  res.send('create prefix')
}

export const getAllPrefixes = async (req, res) => {
  const jsonPrefix = JSON.parse(
    await readFile(
      new URL('../utils/mockWhat/mockPrefixData.json', import.meta.url)
    )
  )
  console.log(jsonPrefix)

  const packagedData = jsonPrefix.map((keyless) => {
    return { ...keyless, _id: nanoid() }
  })

  // res.status(StatusCodes.OK).send()
  res.status(StatusCodes.OK).json({ prefixes: packagedData })
}

export const getSinglePrefix = async (req, res) => {
  const testItem = {
    Connectionid: req.noRead ? '1' : req.value,
    position: 'mouth',
    hand: 'j',
  }
  res.status(StatusCodes.OK).json({ prefix: testItem })
}

export const updatePrefix = async (req, res) => {
  getSinglePrefix({ noRead: false, value: nanoid() }, res)
}

export const deletePrefix = async (req, res) => {
  getSinglePrefix({ noRead: false, value: nanoid() }, res)
}
