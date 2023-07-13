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

  module.exports = mongoose.model('Order', orderSchema)