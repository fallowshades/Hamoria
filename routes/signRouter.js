import { Router } from 'express'
const router = Router()

import {
  getAllSigns,
  getSign,
  createSign,
  updateSign,
  deleteSign,
} from '../controllers/signController.js'

router.route('/').get(getAllSigns).post(createSign)
router.route('/:id').get(getSign).patch(updateSign).delete(deleteSign)

export default router
