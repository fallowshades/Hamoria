import { Router } from 'express'

import {
  getAllReferences,
  getSingleReference,
  createReference,
  updateReference,
  deleteReference,
} from '../controllers/referenceController.js'

import {
  validateReferenceInput,
  validateIdParam,
} from '../middleware/validateReferenceMiddleware.js'

const router = Router()

router
  .route('/')
  .post(validateReferenceInput, createReference)
  .get(getAllReferences)

router
  .route('/:id')
  .get(validateIdParam, getSingleReference)
  .patch(validateReferenceInput, updateReference)
  .delete(validateIdParam, deleteReference)
export default router
