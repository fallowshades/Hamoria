import { StatusCodes } from 'http-status-codes'
import 'express-async-errors'
import { WORD_SUBSECTION } from '../../utils/constants.js'

import { getCategorizedData } from '../sharedQueries/categorizedData.js'
import Word from '../../models/wordModel.js'
import Example from '../../models/exampleModel.js'
export const createDomain = async (req, res) => {
  res.send('create Domain')
}

export const getAllDomain = async (req, res) => {
  const queryObject = {
    subsection: [
      WORD_SUBSECTION.V_1,
      WORD_SUBSECTION.V_2,
      WORD_SUBSECTION.V_3,
      WORD_SUBSECTION.V_4,
      WORD_SUBSECTION.M_1,
      WORD_SUBSECTION.M_2,
      WORD_SUBSECTION.M_3,
      WORD_SUBSECTION.M_4,
      WORD_SUBSECTION.S_1,
      WORD_SUBSECTION.S_2,
      WORD_SUBSECTION.S_3,
      WORD_SUBSECTION.S_4,
    ],
  }

  const [categorizedDomainData, categorizedExampleData] = await Promise.all([
    getCategorizedData(Word, queryObject),
    getCategorizedData(Example, queryObject),
  ])

  res
    .status(StatusCodes.OK)
    .json({ categorizedExampleData, categorizedDomainData })
}

export const getSingleDomain = async (req, res) => {
  res.send('get single Domain')
}

export const updateDomain = async (req, res) => {
  res.send('update Domain')
}

export const deleteDomain = async (req, res) => {
  res.send('delete Domain')
}
