const mongoose = require('mongoose');
// Ensure the Category model is processed by Mongoose (for populating Menu Item queries)
require('./Category')
const itemSchema = require('./ItemSchema');

module.exports = mongoose.model('Item', itemSchema);