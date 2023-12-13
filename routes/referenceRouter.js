import { Router } from 'express'

import {
  getAllReferences,
  getSingleReference,
  createReference,
  updateReference,
  deleteReference,
} from '../controllers/referenceController.js'

import { validateReferenceInput } from '../middleware/validateReferenceMiddleware.js'

const router = Router()

router
  .route('/')
  .post(validateReferenceInput, createReference)
  .get(getAllReferences)

router
  .route('/:id')
  .get(getSingleReference)
  .patch(validateReferenceInput, updateReference)
  .delete(deleteReference)
export default router
