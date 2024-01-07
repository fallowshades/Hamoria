import 'express-async-errors'
import { StatusCodes } from 'http-status-codes'
import Example from '../models/exampleModel.js'

export const createExample = async (req, res) => {
  const example = await Example.create(req.body)
  res.status(StatusCodes.CREATED).json({ example })
}

export const getAllExample = async (req, res) => {
  const example = await Example.find({})
  res.status(StatusCodes.OK).json({ example })
}

export const getExample = async (req, res) => {
  const { id } = req.params
  const example = await Example.findById(id)
  res.status(StatusCodes.OK).json({ example })
}

export const updateExample = async (req, res) => {
  const example = await Example.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(StatusCodes.OK).json({ example })
}

export const deleteExample = async (req, res) => {
  const example = await Example.findByIdAndDelete(req.params.id)
  res.status(StatusCodes.OK).json({ example })
}
