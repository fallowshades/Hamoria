import { StatusCodes } from 'http-status-codes'
import PrefixModel from '../models/prefixModel.js'
import 'express-async-errors'

import { readFile } from 'fs/promises'
import dotenv from 'dotenv'

export const createPrefix = async (req, res) => {
  res.send('create prefix')
}

export const getAllPrefixes = async (req, res) => {
  const jsonPrefix = JSON.parse(
    await readFile(
      new URL('../utils/mockWhat/mockPrefixData.json', import.meta.url)
    )
  )

  res.send(jsonPrefix)
}

export const getSinglePrefix = async (req, res) => {
  res.send('get single prefix')
}

export const updatePrefix = async (req, res) => {
  res.send('update prefix')
}

export const deletePrefix = async (req, res) => {
  res.send('delete prefix')
}
