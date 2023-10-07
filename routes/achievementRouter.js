import { Router } from 'express'
import {
  validateAchievementInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js'
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
  .post(validateAchievementInput, createAchievement)
router
  .route('/:id')
  .get(validateIdParam, getAchievement)
  .patch(validateAchievementInput, updateAchievement)
  .delete(validateIdParam, deleteAchievement)

export default router
