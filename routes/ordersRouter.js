import { Router } from 'express'
import { validateOrdersInput } from '../middleware/validationOrdersMiddleware.js'
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authMiddleware.js'

import {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} from '../controllers/orderController.js'

const router = Router()

router
  .route('/')
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizePermissions('user'), getAllOrders)

router.route('/showAllMyOrders').get(authenticateUser, getCurrentUserOrders)

router
  .route('/:id')
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrder)
export default router
