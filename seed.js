require('dotenv').config();
require('./db/index');

const Category = require('./models/Category');
const Item = require('./models/Item');

(async function() {
  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'Coffee', sortOrder: 10},
    {name: 'Food', sortOrder: 20},
    {name: 'Dessert', sortOrder: 30}, 
  ]); 
  

  await Item.deleteMany({});
  const items = await Item.create([
    {name: 'Coffe', emoji: '☕', category: categories[0], price: 3.95},
    {name: 'Decaff Coffee', emoji: '☕', category: categories[0], price: 3.95},
    {name: 'Single Espresso', emoji: '☕', category: categories[0], price: 3.95},
    {name: 'Double Espresso', emoji: '☕', category: categories[0], price: 4.95},
    {name: 'Macchiato', emoji: '☕', category: categories[0], price: 5.95},
    {name: 'Latte', emoji: '☕', category: categories[0], price: 5.95},
    {name: 'Cappuccino', emoji: '☕', category: categories[0], price: 5.95},
    {name: 'Tea', emoji: '🍵', category: categories[0], price: 3.95},
    {name: 'Milk', emoji: '🥛', category: categories[0], price: 2.95},
    {name: 'Baggel', emoji: '🥯', category: categories[1], price : 3.95},
    {name: 'Hotdog', emoji: '🌭', category: categories[1], price : 3.95},
    {name: 'Pizza Slice', emoji: '🍕', category: categories[1], price: 4.25},
    {name: 'Garlic Bread', emoji: '🍞', category: categories[1], price: 2.95},
    {name: 'French Fries', emoji: '🍟', category: categories[1], price: 4.95},
    {name: 'Green Salad', emoji: '🥗', category: categories[1], price: 7.95},
    {name: 'Ice Cream', emoji: '🍨', category: categories[2], price: 2.95},
    {name: 'Cup Cake', emoji: '🧁', category: categories[2], price: 2.95},
    {name: 'Chocolate Chip Cookie ', emoji: '🍪', category: categories[2], price: 2.95},
    {name: 'Strawberry Shortcake', emoji: '🍰', category: categories[2], price: 3.95},
   
  ]);

  console.log(items)

  process.exit();
})();