import { StatusCodes } from 'http-status-codes'
import 'express-async-errors'
import { WORD_SUBSECTION } from '../../utils/constants.js'
import Word from '../../models/wordModel.js'
import {
  getCategoryQuery,
  getGroupByQuery,
  getSortByQuery,
} from '../sharedQueries/categorizedData.js'
export const createTuple = async (req, res) => {
  res.send('create Tuple')
}

export const getAllTuple = async (req, res) => {
  const queryObject = {
    subsection: [
      WORD_SUBSECTION.T_1,
      WORD_SUBSECTION.J_1,
      WORD_SUBSECTION.J_2,
      WORD_SUBSECTION.J_3,
      WORD_SUBSECTION.J_4,
      WORD_SUBSECTION.J_5,
      WORD_SUBSECTION.SPR_1,
      WORD_SUBSECTION.SPR_2,
      WORD_SUBSECTION.SPR_3,
      WORD_SUBSECTION.G_1,
      WORD_SUBSECTION.G_2,
      WORD_SUBSECTION.O_1,
      WORD_SUBSECTION.OSP_1,
      WORD_SUBSECTION.OSP_2,
      WORD_SUBSECTION.OSP_3,
    ],
  }

  const categorizedTupleData = await Word.aggregate([
    getCategoryQuery(queryObject.subsection),
    getGroupByQuery(),

    getSortByQuery(),
  ])
  console.log(categorizedTupleData)

  res.status(StatusCodes.OK).json({ categorizedTupleData })
}

export const getSingleTuple = async (req, res) => {
  res.send('get single Tuple')
}

export const updateTuple = async (req, res) => {
  res.send('update Tuple')
}

export const deleteTuple = async (req, res) => {
  res.send('delete Tuple')
}
