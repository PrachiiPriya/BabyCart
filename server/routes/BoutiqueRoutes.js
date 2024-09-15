const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/ProductSchema'); 
// const products=require('../ProductData');

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get('/:collection', async (req, res) => {
  const collection = req.params.collection;
    const products = await Product.find({ collection });
    res.status(200).json(products);
  });

router.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    const products = await Product.find({ title: { $regex: query, $options: 'i' } }); 
    res.status(200).json(products);
});

router.get('/product/:id', async (req, res) => {
  try{
    const id= req.params.id;
    const product = await Product.findOne({ 'id': id})
    res.status(200).json(product);
  } catch(error) {
    res.status(500).json({ message: error.message })
  }
});
module.exports = router;