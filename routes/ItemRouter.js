const router = require('express').Router()
const controller = require('../controllers/ItemController')
const middleware = require('../middleware')

router.get('/:categoryId', controller.GetItems)
router.post(
  '/',
  // middleware.stripToken,
  // middleware.verifyToken,
  middleware.checkAuth,
  controller.CreateItem
)
router.put(
  '/:item_id',
  // middleware.stripToken,
  // middleware.verifyToken,
  middleware.checkAuth,
  controller.UpdateItem
)
router.delete(
  '/:item_id',
  // middleware.stripToken,
  // middleware.verifyToken,
  middleware.checkAuth,
  controller.DeleteItem
)

module.exports = router