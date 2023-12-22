import { Router } from 'express'
import { validateOrientationInput } from '../middleware/validateOrientationMiddleware.js'

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
  .get(getSingleOrientation)
  .patch(validateOrientationInput, updateOrientation)
  .delete(deleteOrientation)
export default router
