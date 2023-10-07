import { Router } from 'express'
const router = Router()

import {
  getAllAchievements,
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../controllers/achievementController.js'

router.route('/').get(getAllAchievements).post(createAchievement)
router
  .route('/:id')
  .get(getAchievement)
  .patch(updateAchievement)
  .delete(deleteAchievement)

export default router
