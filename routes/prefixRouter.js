import { Router } from 'express'

import {
  getAllPrefixes,
  getSinglePrefix,
  createPrefix,
  updatePrefix,
  deletePrefix,
} from '../controllers/prefixController.js'

import { validatePrefixInput } from '../middleware/validatePrefixMiddleware.js'

const router = Router()

router.route('/').post(validatePrefixInput, createPrefix).get(getAllPrefixes)

router
  .route('/:id')
  .get(getSinglePrefix)
  .patch(validatePrefixInput, updatePrefix)
  .delete(deletePrefix)
export default router
