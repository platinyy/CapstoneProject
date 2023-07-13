const Order = require('../models/order');
const jwt = require("jsonwebtoken");



const cart = async (req, res) => {
    try {
      const cart = await Order.getCart(req.user._id);
      res.status(200).json(cart);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  };
  
  const addToCart = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized" });
      }
  
      const cart = await Order.getCart(req.user._id);
      await cart.addItemToCart(req.params.id);
      res.status(200).json(cart);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  };
  const setItemQtyInCart = async (req, res) => {
    try {
      const cart = await Order.getCart(req.user._id);
      await cart.setItemQty(req.body.itemId, req.body.newQty);
      res.status(200).json(cart);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  };
  const checkout = async (req, res) => {
    try {
      const cart = await Order.getCart(req.user._id);
      cart.isPaid = true;
      await cart.save();
      res.status(200).json(cart);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  };

module.exports = {
    cart,
    addToCart,
    setItemQtyInCart,
    checkout,
};
