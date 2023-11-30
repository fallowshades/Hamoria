import { StatusCodes } from 'http-status-codes'
import 'express-async-errors'

export const getAllDenial = async (req, res) => {
  res.send('get all Denial')
}

export const getSingleDenial = async (req, res) => {
  res.send('get single Denial')
}

export const updateDenial = async (req, res) => {
  res.send('update Denial')
}

export const deleteDenial = async (req, res) => {
  res.send('delete Denial')
}
