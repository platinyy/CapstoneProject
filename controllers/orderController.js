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
  const history = async (req, res) => {
    // Sort most recent orders first
    try {
        const orders = await Order.find({ user: req.user._id, isPaid: true })
            .sort("-updatedAt")
            .exec();
        res.status(200).json(orders);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
};

const historyById = async (req, res) => {
    try {
        const historyById = await Order.findById(req.params.id);
        console.log("===", historyById);
        if (historyById === null) {
            res.status(404).json({ msg: "history not found" });
        } else {
            res.status(200).json(historyById);
        }
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
};

module.exports = {
    cart,
    addToCart,
    setItemQtyInCart,
    checkout,
    history,
    historyById
};
