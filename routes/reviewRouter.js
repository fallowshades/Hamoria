import { Router } from 'express'
const router = Router()
import { authenticateUser } from '../middleware/authMiddleware.js'
import {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js'

import { validateNonPrimaryKey } from '../middleware/validateSignMiddleware.js'
import {
  validateReviewInput,
  validateAlreadySubmittedNotPrimary,
} from '../middleware/validateReviewMiddleware.js'
router
  .route('/')
  .post(
    authenticateUser,
    validateReviewInput,
    validateNonPrimaryKey,
    validateAlreadySubmittedNotPrimary,

    createReview
  )
  .get(getAllReviews)

router
  .route('/:id')
  .get(getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview)

export default router
