import { StatusCodes } from 'http-status-codes'
import PrefixModel from '../models/prefixModel.js'
import 'express-async-errors'

export const createPrefix = async (req, res) => {}

export const getAllPrefixes = async (req, res) => {
  res.status(StatusCodes.OK).json({ prefixes: {} })
}

export const getSinglePrefix = async (req, res) => {}

export const updatePrefix = async (req, res) => {}

export const deletePrefix = async (req, res) => {}
