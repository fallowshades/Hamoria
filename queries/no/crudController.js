import { StatusCodes } from 'http-status-codes'
import 'express-async-errors'

export const getAllCRUD = async (req, res) => {
  res.send('get all crud')
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
