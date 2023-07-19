const Order = require("../models/order");
const jwt = require("jsonwebtoken");

// A cart is the unpaid order for a user
const cart = async (req, res) => {
    try {
        const cart = await Order.getCart(req.user._id);
        res.status(200).json(cart);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
};

// Add an item to the cart
const addToCart = async (req, res) => {
    try {
       

        const cart = await Order.getCart(req.params.user_id);
        await cart.addItemToCart(req.params.id);
        res.status(200).json(cart);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
};

// Updates an item's qty in the cart
const setItemQtyInCart = async (req, res) => {
    try {
        const cart = await Order.getCart(req.params.user_id);
        await cart.setItemQty(req.body.itemId, req.body.newQty);
        res.status(200).json(cart);
    } catch (e) {
        console.log(e)
        res.status(400).json({ msg: e.message });
    }
};

// Update the cart's isPaid property to true
const checkout = async (req, res) => {
    try {
        const cart = await Order.getCart(req.params.user_id);
        cart.isPaid = true;
        await cart.save();
        res.status(200).json(cart);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
};

// Return the logged in user's paid order history
const history = async (req, res) => {
    // Sort most recent orders first
    try {
        const orders = await Order.find({ user: req.params.user_id, isPaid: true })
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
    historyById,
};