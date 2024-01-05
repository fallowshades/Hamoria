import { StatusCodes } from 'http-status-codes'
import 'express-async-errors'
import Word from '../../models/wordModel.js'
import { WORD_SUBSECTION } from '../../utils/constants.js'
import {
  getCategoryQuery,
  getGroupByQuery,
} from '../sharedQueries/categorizedData.js'

export const createCRUD = async (req, res) => {
  res.send('create crud')
}

export const getAllCRUD = async (req, res) => {
  const queryObject = {
    subsection: [
      WORD_SUBSECTION.INTRO_1,
      WORD_SUBSECTION.INTRO_2,
      WORD_SUBSECTION.INTRO_3,
      WORD_SUBSECTION.INTRO_4,
      WORD_SUBSECTION.INTRO_5,
      WORD_SUBSECTION.INTRO_6,
      WORD_SUBSECTION.INTRO_7,
    ],
  }

  const categorizedCrudData = await Word.aggregate([
    getCategoryQuery(queryObject.subsection),
    getGroupByQuery(),
  ])

  res.status(StatusCodes.OK).json({ categorizedCrudData })
}

export const getSingleCRUD = async (req, res) => {
  res.send('get single crud')
}

export const updateCRUD = async (req, res) => {
  res.send('update crud')
}

export const deleteCRUD = async (req, res) => {
  res.send('delete crud')
}
