import { Router } from 'express'
import { validateAchievementInput } from '../middleware/validationMiddleware.js'
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
  .get(getAchievement)
  .patch(validateAchievementInput, updateAchievement)
  .delete(deleteAchievement)

export default router
