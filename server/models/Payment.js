const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  paymentMethod: { type: String, enum: ["بطاقة", "تحويل بنكي"], required: true },
  transactionId: { type: String, unique: true },
  status: { type: String, enum: ["ناجح", "فشل"], default: "ناجح" },
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
