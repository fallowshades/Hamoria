import { StatusCodes } from 'http-status-codes'
import Review from '../models/reviewModel.js'
import Sign from '../models/signModel.js'
import 'express-async-errors'
import { NotFoundError, BadRequestError } from '../errors/customErrors.js'

export const createReview = async (req, res) => {
  const { product: productId } = req.body

  console.log(productId)
  const isValidProduct = await Sign.findOne({
    _id: productId,
  })

  if (!isValidProduct) {
    throw new NotFoundError(`No product with id: ${productId}`)
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  })

  if (alreadySubmitted) {
    throw new BadRequestError('Already submitted review for this product')
  }

  req.body.user = req.user.userId
  const review = await Review.create(req.body)
  res.status(StatusCodes.CREATED).json({ review })
}
export const getAllReviews = async (req, res) => {
  res.send('get all reviews')
}
export const getSingleReview = async (req, res) => {
  res.send('get single reviews')
}
export const updateReview = async (req, res) => {
  res.send('update reviews')
}
export const deleteReview = async (req, res) => {
  res.send('delete reviews')
}
