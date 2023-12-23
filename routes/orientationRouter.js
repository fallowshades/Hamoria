import { Router } from 'express'
import {
  validateOrientationInput,
  validateIdParam,
} from '../middleware/validateOrientationMiddleware.js'

import {
  getAllOrientations,
  getSingleOrientation,
  createOrientation,
  updateOrientation,
  deleteOrientation,
} from '../controllers/orientationController.js'

const router = Router()

router
  .route('/')
  .post(validateOrientationInput, createOrientation)
  .get(getAllOrientations)

router
  .route('/:id')
  .get(validateIdParam, getSingleOrientation)
  .patch(validateOrientationInput, updateOrientation)
  .delete(validateIdParam, deleteOrientation)
export default router
