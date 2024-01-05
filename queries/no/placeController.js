import { StatusCodes } from 'http-status-codes'
import 'express-async-errors'
import { WORD_SUBSECTION } from '../../utils/constants.js'
import Word from '../../models/wordModel.js'
import {
  getCategoryQuery,
  getGroupByQuery,
} from '../sharedQueries/categorizedData.js'
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

  const categorizedPlaceData = await Word.aggregate([
    getCategoryQuery(queryObject.subsection),
    getGroupByQuery(),
  ])

  res.status(StatusCodes.OK).json({ categorizedPlaceData })
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
