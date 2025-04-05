const mongoose = require('mongoose');

const customOrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true }, // أضفنا name
    designDescription: { type: String, required: true },
    images: [{ type: String }], // تعديل لأكثر من صورة
    message: { type: String },
    priceRange: {
      min: { type: Number },
      max: { type: Number },
    }, // حقل جديد لمجال الأسعار
    material: { type: String }, // حقل جديد للمادة
    status: { type: String, default: 'قيد التنفيذ' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CustomOrder', customOrderSchema);