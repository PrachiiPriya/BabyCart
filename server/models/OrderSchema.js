const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.Mixed },
  title: { type: String },
  price: { type: String },
  discount: { type: String },
  quantity: { type: Number },
  url: { type: String },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  razorpayOrderId: { type: String, required: true, unique: true },
  razorpayPaymentId: { type: String, default: null },
  amount: { type: Number, required: true },
  amountRupees: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  receipt: { type: String },
  status: {
    type: String,
    enum: ['created', 'paid', 'failed'],
    default: 'created',
  },
  items: [orderItemSchema],
  userId: { type: String, default: null },
}, { timestamps: true });

orderSchema.index({ razorpayOrderId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
