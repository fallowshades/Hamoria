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
  const testItem = {
    word: req.noRead ? '1' : req.value,
    subgroup: 'money',
    subsection: 'a',
    prefixid: 1000,
  }
  res.status(StatusCodes.OK).json({ prefix: testItem })
}

export const updateWord = async (req, res) => {
  getSingleWord({ noRead: false, value: nanoid() }, res)
}

export const deleteWord = async (req, res) => {
  getSingleWord({ noRead: false, value: nanoid() }, res)
}
