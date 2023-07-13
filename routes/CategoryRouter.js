const router = require('express').Router()
const controller = require('../controllers/CategoryController')
const middleware = require('../middleware')

router.get('/', controller.GetCategories)
router.post(
  '/',
  //middleware.stripToken,
  //middleware.verifyToken,
  middleware.checkAuth,
  controller.CreateCategory
)
router.put(
  '/:category_id',
  //middleware.stripToken,
  //middleware.verifyToken,
  middleware.checkAuth,
  controller.UpdateCategory
)
router.delete(
  '/:category_id',
  //middleware.stripToken,
  //middleware.verifyToken,
  middleware.checkAuth,
  controller.DeleteCategory
)

module.exports = router