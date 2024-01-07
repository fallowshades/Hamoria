import { StatusCodes } from 'http-status-codes'
import 'express-async-errors'
import { WORD_SUBSECTION } from '../../utils/constants.js'
import Word from '../../models/wordModel.js'

import Example from '../../models/exampleModel.js'
import { getCategorizedData } from '../sharedQueries/categorizedData.js'

export const createPlace = async (req, res) => {
  res.send('create place')
}

export const getAllPlace = async (req, res) => {
  const queryObject = {
    subsection: [
      WORD_SUBSECTION.N_1,
      WORD_SUBSECTION.NYP_1,
      WORD_SUBSECTION.I_1,
    ],
  }

  const [categorizedPlaceData, categorizedExampleData] = await Promise.all([
    getCategorizedData(Word, queryObject),
    getCategorizedData(Example, queryObject),
  ])

  res
    .status(StatusCodes.OK)
    .json({ categorizedPlaceData, categorizedExampleData })
}

export const getSinglePlace = async (req, res) => {
  res.send('get single Place')
}

export const updatePlace = async (req, res) => {
  res.send('update Place')
}

export const deletePlace = async (req, res) => {
  res.send('delete Place')
}
