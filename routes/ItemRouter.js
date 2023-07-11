const router = require('express').Router()
const controller = require('../controllers/ItemController')
const middleware = require('../middleware')

router.get('/', controller.GetItems)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateItem
)
router.put(
  '/:item_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateItem
)
router.delete(
  '/:item_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteItem
)

module.exports = router