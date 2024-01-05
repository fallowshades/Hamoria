import { StatusCodes } from 'http-status-codes'
import 'express-async-errors'
import { WORD_SUBSECTION } from '../../utils/constants.js'
import Word from '../../models/wordModel.js'

export const createItem = async (req, res) => {
  res.send('create Item')
}

export const getAllItem = async (req, res) => {
  const queryObject = {
    subsection: [
      WORD_SUBSECTION.K_1,
      WORD_SUBSECTION.L_1,
      WORD_SUBSECTION.L_2,
      WORD_SUBSECTION.L_3,
      WORD_SUBSECTION.VINKEL,
    ],
  }

  const itemData = await Word.find(queryObject)
  res.status(StatusCodes.OK).json({ itemData })
}

export const getSingleItem = async (req, res) => {
  res.send('get single Item')
}

export const updateItem = async (req, res) => {
  res.send('update Item')
}

export const deleteItem = async (req, res) => {
  res.send('delete Item')
}
