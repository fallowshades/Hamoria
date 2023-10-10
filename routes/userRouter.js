import { Router } from 'express'
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js'
import { authorizePermissions } from '../middleware/authMiddleware.js'
import upload from '../middleware/multerMiddleware.js'

import { checkForTestUserd } from '../middleware/authMiddleware.js'

const router = Router()

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from '../controllers/userController.js'

router.get('/current-user', getCurrentUser)
router.get(
  '/admin/app-stats',
  authorizePermissions('admin'),
  getApplicationStats
)
router.patch(
  checkForTestUserd,
  '/update-user',
  upload.single('avatar'),
  validateUpdateUserInput,
  updateUser
)
export default router
