import { Router } from 'express'

import {
  getAllPrefixes,
  getSinglePrefix,
  createPrefix,
  updatePrefix,
  deletePrefix,
} from '../controllers/prefixController.js'

import {
  validatePrefixInput,
  validateIdParam,
} from '../middleware/validatePrefixMiddleware.js'

const router = Router()

router.route('/').post(validatePrefixInput, createPrefix).get(getAllPrefixes)

router
  .route('/:id')
  .get(validateIdParam, getSinglePrefix)
  .patch(validatePrefixInput, updatePrefix)
  .delete(validateIdParam, deletePrefix)
export default router
