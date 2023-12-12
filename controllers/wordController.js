import { StatusCodes } from 'http-status-codes'
import wordModel from '../models/wordModel.js'
import 'express-async-errors'

import { readFile } from 'fs/promises'
import { nanoid } from 'nanoid'

export const createWord = async (req, res) => {
  res.send('create word')
}

export const getAllWords = async (req, res) => {
  const jsonPrefix = JSON.parse(
    await readFile(
      new URL('../utils/mockWhat/mockWordData.json', import.meta.url)
    )
  )

  const packagedData = jsonPrefix.map((keyless) => {
    return { ...keyless, _id: nanoid() }
  })

  res.status(StatusCodes.OK).json({ words: packagedData })
}

export const getSingleWord = async (req, res) => {
  res.send('get single word')
}

export const updateWord = async (req, res) => {
  res.send('update word')
}

export const deleteWord = async (req, res) => {
  res.send('delete word')
}
