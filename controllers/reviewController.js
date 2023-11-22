import { StatusCodes } from 'http-status-codes'
import Review from '../models/reviewModel.js'
import 'express-async-errors'

export const createReview = async (req, res) => {
  req.body.user = req.user.userId
  const review = await Review.create(req.body)
  res.status(StatusCodes.CREATED).json({ review })
}
export const getAllReviews = async (req, res) => {
  const reviews = await Review.find({})

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
}
export const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params

  const review = await Review.findOne({ _id: reviewId })
  res.status(StatusCodes.OK).json({ review })
}
export const updateReview = async (req, res) => {
  res.send('update reviews')
}
export const deleteReview = async (req, res) => {
  res.send('delete reviews')
}
