const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  url: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  discount: { type: String, required: true },
  quantity: { type: Number, required: true },
  collection: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  age: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
