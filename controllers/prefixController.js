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
  res.send('get single prefix')
}

export const updatePrefix = async (req, res) => {
  res.send('update prefix')
}

export const deletePrefix = async (req, res) => {
  res.send('delete prefix')
}
