import { Router } from 'express'

import {
  createExample,
  getAllExample,
  getExample,
  updateExample,
  deleteExample,
} from '../controllers/exampleController.js'

import {
  validateExampleInput,
  validateIdParam,
} from '../middleware/validateExampleMiddleware.js'

const router = Router()

router.route('/').post(validateExampleInput, createExample).get(getAllExample)

router
  .route('/:id')
  .get(validateIdParam, getExample)
  .patch(validateExampleInput, updateExample)
  .delete(validateIdParam, deleteExample)

export default router
