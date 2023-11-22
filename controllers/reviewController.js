import { StatusCodes } from 'http-status-codes'
import Review from '../models/reviewModel.js'
import 'express-async-errors'

export const createReview = async (req, res) => {
  const { product: productId } = req.body

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
