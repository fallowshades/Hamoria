import { StatusCodes } from 'http-status-codes'
import Reference from '../models/referenceModel.js'
import 'express-async-errors'

import { readFile } from 'fs/promises'
import { nanoid } from 'nanoid'
import { STATUS_CODES } from 'http'

export const createReference = async (req, res) => {
  const { bodycontact, touchType, faceexpression, link } = req.body
  const reference = await Reference.create(req.body)
  res.status(StatusCodes.OK).json({ reference })
}

export const getAllReferences = async (req, res) => {
  const { position, bodycontact, touchtype, faceexpression, link, sort } =
    req.query

  const queryObject = {}

  if (position && position !== 'all') {
    queryObject.position = position
  }
  if (bodycontact && bodycontact !== 'all') {
    queryObject.bodycontact = bodycontact
  }
  if (touchtype && touchtype !== 'all') {
    queryObject.touchtype = touchtype
  }
  if (faceexpression && faceexpression !== 'all') {
    queryObject.faceexpression = faceexpression
  }

  const sortOptions = {
    'a-z': 'faceexpression',
    'z-a': '-faceexpression',
  }

  const sortKey = sortOptions[sort] || sortOptions['a-z']
  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  const reference = await Reference.find({})
    .sort(sortKey)
    .skip(skip)
    .limit(limit)

  const totalReferences = await Reference.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalReferences / limit)

  res.status(StatusCodes.OK).json({
    totalReferences,
    numOfPages,
    currentPage: page,
    references: reference,
  })

  /**const jsonPrefix = JSON.parse(
    await readFile(
      new URL('../utils/mockWhat/mockReferenceData.json', import.meta.url)
    )
  )

  const packagedData = jsonPrefix.map((keyless) => {
    return { ...keyless, _id: nanoid() }
  })

  res.status(StatusCodes.OK).json({ references: packagedData }) */
}

export const getSingleReference = async (req, res) => {
  const { id } = req.params
  const reference = await Reference.findById(id)
  if (!reference) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: 'no reference with id' })
  }
  res.status(StatusCodes.OK).json({ reference })
}

export const updateReference = async (req, res) => {
  const { id } = req.params

  const updatedReference = await Reference.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  if (!updatedReference) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `no reference with id ${id}` })
  }
  res.status(StatusCodes.OK).json({ reference: updatedReference })
}

export const deleteReference = async (req, res) => {
  const { id } = req.params
  const removedReference = await Reference.findByIdAndUpdate(id)

  if (!removedReference) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `no reference with id ${id}` })
  }
  res.status(StatusCodes.OK).json({ reference: removedReference })
}
