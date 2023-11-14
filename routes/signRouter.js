import { Router } from 'express'
import { validateSignInput } from '../middleware/validateSignMiddleware.js'

//import { validateSignInput } from '../middleware/validationMiddleware.js'
const router = Router()

import {
  getAllSigns,
  getSign,
  createSign,
  updateSign,
  deleteSign,
} from '../controllers/signController.js'

router.route('/').get(getAllSigns).post(validateSignInput, createSign)
router
  .route('/:id')
  .get(getSign)
  .patch(validateSignInput, updateSign)
  .delete(deleteSign)

export default router
