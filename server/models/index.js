const mongoose = require('mongoose');

// Import all model schemas
const Cart = require('./Cart');
const Category = require('./Category');
const CustomOrder = require('./CustomOrder');
const Message = require('./Message'); // Gift messages
const ContactMessage = require('./contactMessages'); // Contact Us messages
const Order = require('./Order');
const Payment = require('./Payment');
const Product = require('./Product');
const Review = require('./Review');
const User = require('./User');
const Wishlist = require('./Wishlist');
const Discount = require('./discount');
// Export all models
module.exports = {
  Cart,
  Category,
  CustomOrder,
  Discount,
  Message,
  ContactMessage,
  Order,
  Payment,
  Product,
  Review,
  User,
  Wishlist
};