const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const middleware = require('../middleware')


router.get('/cart',middleware.stripToken, middleware.verifyToken,  orderController.cart);
router.get('/history/:user_id',middleware.stripToken, middleware.verifyToken,  orderController.history);
router.get('/history/orders/:id',  middleware.stripToken,middleware.verifyToken, orderController.historyById);

router.post('/cart/items/:id/:user_id', middleware.stripToken,middleware.verifyToken,orderController.addToCart);
router.post('/cart/checkout/:user_id', middleware.stripToken,middleware.verifyToken, orderController.checkout);
router.put('/cart/qty/:user_id', middleware.stripToken,middleware.verifyToken,  orderController.setItemQtyInCart);

module.exports = router;