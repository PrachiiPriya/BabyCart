const express = require('express');
const router = express.Router();
const Cart = require('../models/cartSchema')

// Add item to cart
router.post('/add', async (req, res) => {
    const { username, productId, title, price, discount, quantity } = req.body;

    if (!username || !productId || !title || !price || quantity <= 0) {
        return res.status(400).json({ error: 'Missing required fields or invalid data.' });
    }

    try {
        // Find or create cart for the user
        let cart = await Cart.findOne({ username });

        if (cart) {
            // Check if the item already exists in the cart
            const existingItem = cart.items.find(item => item.productId.toString() === productId);

            if (existingItem) {
                // Update the quantity if the item already exists
                existingItem.quantity += quantity;
            } else {
                // Add a new item to the cart
                cart.items.push({ productId, title, price, discount, quantity });
            }

            // Save the updated cart
            await cart.save();
        } else {
            // Create a new cart if none exists
            cart = new Cart({
                username,
                items: [{ productId, title, price, discount, quantity }]
            });
            await cart.save();
        }

        res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Fetch cart items for a user
router.get('/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const cart = await Cart.findOne({ username }).populate('items.productId', 'title price discount');

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found.' });
        }

        res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Remove item from cart
router.post('/remove', async (req, res) => {
    const { username, productId, quantity } = req.body;

    if (!username || !productId || quantity <= 0) {
        return res.status(400).json({ error: 'Missing required fields or invalid data.' });
    }

    try {
        const cart = await Cart.findOne({ username });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found.' });
        }

        const item = cart.items.find(item => item.productId.toString() === productId);

        if (item) {
            if (item.quantity <= quantity) {
                // Remove item from the cart if quantity is less than or equal to the requested quantity
                cart.items = cart.items.filter(item => item.productId.toString() !== productId);
            } else {
                // Otherwise, just reduce the quantity
                item.quantity -= quantity;
            }

            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).json({ error: 'Item not found in the cart.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;
