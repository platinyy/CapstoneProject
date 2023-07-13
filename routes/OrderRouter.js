const express = require('express');
const router = express.Router();
const orderController = require ('../controllers/orderController')
const middleware = require('../middleware')



router.get('/cart', middleware.checkAuth, orderController.cart);


router.post('/cart/items/:id', middleware.checkAuth, orderController.addToCart);
router.post('/cart/checkout', middleware.checkAuth, orderController.checkout);
router.put('/cart/qty', middleware.checkAuth, orderController.setItemQtyInCart);

module.exports = router;