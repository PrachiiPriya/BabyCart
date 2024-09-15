const mongoose = require('mongoose');

// Define cart schema
const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product
  title: { type: String, required: true }, // Store product title
  price: { type: String, required: true }, // Store product price
  discount: { type: String, required: true }, // Store product discount
  quantity: { type: Number, required: true } // Quantity in the cart
});

// Define cart schema
const cartSchema = new mongoose.Schema({
  username: { type: String, required: true },
  items: [cartItemSchema] // Array of cart items
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
