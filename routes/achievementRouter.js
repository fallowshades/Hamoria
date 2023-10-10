import { Router } from 'express'
import {
  validateAchievementInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js'
import { checkForTestUser } from '../middleware/authMiddleware.js'
const router = Router()

import {
  getAllAchievements,
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../controllers/achievementController.js'

router
  .route('/')
  .get(getAllAchievements)
  .post(checkForTestUser, validateAchievementInput, createAchievement)
router
  .route('/:id')
  .get(validateIdParam, getAchievement)
  .patch(checkForTestUser, validateAchievementInput, updateAchievement)
  .delete(checkForTestUser, validateIdParam, deleteAchievement)

export default router
