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

router.route('/').post(authenticateUser, createReview).get(getAllReviews)

router
  .route('/:id')
  .get(getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview)

export default router
