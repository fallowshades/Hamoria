import { Router } from 'express'

import {
  getAllCRUD,
  getSingleCRUD,
  updateCRUD,
  deleteCRUD,
  getAllDomain,
  getSingleDomain,
  updateDomain,
  deleteDomain,
  getAllTuple,
  getSingleTuple,
  updateTuple,
  deleteTuple,
  getAllPlace,
  getSinglePlace,
  updatePlace,
  deletePlace,
  getAllItem,
  getSingleItem,
  updateItem,
  deleteItem,
} from '../queries/no/index.js'
import {
  getAllShock,
  getSingleShock,
  updateShock,
  deleteShock,
  getAllDenial,
  getSingleDenial,
  updateDenial,
  deleteDenial,
  getAllAnger,
  getSingleAnger,
  updateAnger,
  deleteAnger,
  getAllBargain,
  getSingleBargain,
  updateBargain,
  deleteBargain,
  getAllDepression,
  getSingleDepression,
  updateDepression,
  deleteDepression,
  getAllTesting,
  getSingleTesting,
  updateTesting,
  deleteTesting,
  getAllAcceptance,
  getSingleAcceptance,
  updateAcceptance,
  deleteAcceptance,
} from '../queries/so/index.js'

const router = Router()

router.route('/no/crud').get(getAllCRUD)
router.route('/no/domain/').get(getAllDomain)
router.route('/no/tuple').get(getAllTuple)
router.route('/no/place').get(getAllPlace)
router.route('/no/item').get(getAllItem)

router.route('/so/shock/').get(getAllShock)
router.route('/so/denial').get(getAllDenial)
router.route('/so/anger').get(getAllAnger)
router.route('/so/bargain').get(getAllBargain)
router.route('/so/depression').get(getAllDepression)
router.route('/so/testing').get(getAllTesting)
router.route('/so/acceptance').get(getAllAcceptance)

router
  .route('/no/crud/:id')
  .get(getSingleCRUD)
  .patch(updateCRUD)
  .delete(deleteCRUD)
router
  .route('/no/domain/:id')
  .get(getSingleDomain)
  .patch(updateDomain)
  .delete(deleteDomain)
router
  .route('/no/tuple/:id')
  .get(getSingleTuple)
  .patch(updateTuple)
  .delete(deleteTuple)
router
  .route('/no/place/:id')
  .get(getSinglePlace)
  .patch(updatePlace)
  .delete(deletePlace)
router
  .route('/no/item/:id')
  .get(getSingleItem)
  .patch(updateItem)
  .delete(deleteItem)

router
  .route('/so/shock/:id')
  .get(getSingleShock)
  .patch(updateShock)
  .delete(deleteShock)
router
  .route('/so/denial/:id')
  .get(getSingleDenial)
  .patch(updateDenial)
  .delete(deleteDenial)
router
  .route('/so/anger/:id')
  .get(getSingleAnger)
  .patch(updateAnger)
  .delete(deleteAnger)
router
  .route('/so/bargain/:id')
  .get(getSingleBargain)
  .patch(updateBargain)
  .delete(deleteBargain)
router
  .route('/so/depression/:id')
  .get(getSingleDepression)
  .patch(updateDepression)
  .delete(deleteDepression)
router
  .route('/so/testing/:id')
  .get(getSingleTesting)
  .patch(updateTesting)
  .delete(deleteTesting)
router
  .route('/so/acceptance/:id')
  .get(getSingleAcceptance)
  .patch(updateAcceptance)
  .delete(deleteAcceptance)

export default router
