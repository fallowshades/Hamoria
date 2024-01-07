import { Router } from 'express'

import {
  createExample,
  getAllExample,
  getExample,
  updateExample,
  deleteExample,
} from '../controllers/exampleController.js'

const router = Router()

router.route('/').post(createExample).get(getAllExample)

router.route('/:id').get(getExample).patch(updateExample).delete(deleteExample)

export default router
