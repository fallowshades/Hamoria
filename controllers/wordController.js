import { StatusCodes } from 'http-status-codes'
import wordModel from '../models/wordModel.js'
import 'express-async-errors'

import { readFile } from 'fs/promises'
import { nanoid } from 'nanoid'

export const createWord = async (req, res) => {
  res.send('create word')
}

export const getAllWords = async (req, res) => {
  const { search, subgroup, subsection, sort } = req.query

  // Read data from the file
  const jsonWord = JSON.parse(
    await readFile(
      new URL('../utils/mockWhat/mockWordData.json', import.meta.url)
    )
  )

  // Local filtering based on the query parameters
  const filteredWord = jsonWord.filter((row) => {
    return (
      (!search || new RegExp(search, 'i').test(row.word)) &&
      (!subgroup || new RegExp(subgroup, 'i').test(row.subgroup)) &&
      (!subsection || new RegExp(subsection, 'i').test(row.subsection))
    )
  })

  // Local sorting based on the query parameter
  const sortOptions = {
    'a-z': 'position',
    'z-a': '-position',
  }

  const sortKey = sortOptions[sort] || sortOptions['a-z']

  const correlatedOperationData = filteredWord.sort((a, b) =>
    sortKey.startsWith('-')
      ? b[sortKey.slice(1)] - a[sortKey.slice(1)]
      : a[sortKey] - b[sortKey]
  )

  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  // Paginate the data
  const paginatedData = correlatedOperationData.slice(skip, skip + limit)

  // Add unique _id to each item
  const packagedData = paginatedData.map((keyless) => ({
    ...keyless,
    _id: nanoid(),
  }))

  const totalWords = jsonWord.length
  const numOfPages = Math.ceil(totalWords / limit)

  res.status(StatusCodes.OK).json({
    words: packagedData,
    numOfPages,
    currentPage: page,
    totalWords,
  })
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
