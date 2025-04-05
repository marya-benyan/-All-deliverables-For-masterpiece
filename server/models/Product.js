const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  discountedPrice: { type: Number },
  discountApplied: { type: Boolean, default: false },
  images: [{ type: String }],
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  createdAt: { type: Date, default: Date.now },
  stock: { type: Number, required: true, default: 0 },
  // Add these if you want to support popularity and rating sorting
  popularity: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
});

module.exports = mongoose.model('Product', productSchema);