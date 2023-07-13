const router = require('express').Router()
const controller = require('../controllers/AuthController')
const middleware = require('../middleware')

router.post('/login', controller.Login)
router.post('/register', controller.Register)
router.put(
  '/update/:user_id',
  // middleware.stripToken,
  // middleware.verifyToken,
  middleware.checkAuth,
  controller.UpdatePassword
)
router.get(
  '/session',
  // middleware.stripToken,
  // middleware.verifyToken,
  middleware.checkAuth,
  controller.CheckSession
)

module.exports = router
