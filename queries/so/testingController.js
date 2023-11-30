import { StatusCodes } from 'http-status-codes'
import 'express-async-errors'

export const getAllTesting = async (req, res) => {
  res.send('get all Testing')
}

export const getSingleTesting = async (req, res) => {
  res.send('get single Testing')
}

export const updateTesting = async (req, res) => {
  res.send('update Testing')
}

export const deleteTesting = async (req, res) => {
  res.send('delete Testing')
}
