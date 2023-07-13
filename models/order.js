const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./ItemSchema');

const lineItemSchema = new Schema({
    qty: { type: Number, default: 1 },
    item: itemSchema
  }, {
    timestamps: true,
    toJSON: { virtuals: true }
});
lineItemSchema.virtual('extPrice').get(function () {
    // 'this' is bound to the lineItem subdocument
    return this.qty * this.item.price;
  });

const orderSchema = new Schema({
    // An order belongs to a user
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // Makes sense to embed an order's line items
    lineItems: [lineItemSchema],
    // A user's unpaid order is their "cart"
    isPaid: { type: Boolean, default: false },
  }, {
    timestamps: true,
    toJSON: { virtuals: true }
  });

  orderSchema.virtual('orderTotal').get(function () {
    return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
  });
  
  orderSchema.virtual('totalQty').get(function () {
    return this.lineItems.reduce((total, item) => total + item.qty, 0);
  });
  
  orderSchema.virtual('orderId').get(function () {
    return this.id.slice(-6).toUpperCase();
  });
  orderSchema.statics.getCart = function(userId) {
    // 'this' is bound to the model (don't use an arrow function)
    // return the promise that resolves to a cart (the user's unpaid order)
    return this.findOneAndUpdate(
      // query
      { user: userId, isPaid: false },
      // update - in the case the order (cart) is upserted
      { user: userId },
      // upsert option creates the doc if it doesn't exist!
      { upsert: true, new: true }
    );
  };

  orderSchema.methods.addItemToCart = async function (itemId) {
    const cart = this;
    // Check if item already in cart
    const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
    if (lineItem) {
        lineItem.qty += 1;
    } else {
        const item = await mongoose.model('Item').findById(itemId);
        cart.lineItems.push({ item });
    }
    return cart.save();
};

// Instance method to set an item's qty in the cart (will add item if does not exist)
orderSchema.methods.setItemQty = function (itemId, newQty) {
    // this keyword is bound to the cart (order doc)
    const cart = this;
    // Find the line item in the cart for the menu item
    const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
    if (lineItem && newQty <= 0) {
        // Calling remove, removes itself from the cart.lineItems array
        lineItem.remove();
    } else if (lineItem) {
        // Set the new qty - positive value is assured thanks to prev if
        lineItem.qty = newQty;
    }
    // return the save() method's promise
    return cart.save();
};

  module.exports = mongoose.model('Order', orderSchema)