const express = require('express');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const Order = require('../models/OrderSchema');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

function verifyPaymentSignature(orderId, paymentId, signature) {
  const body = `${orderId}|${paymentId}`;
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
    .update(body)
    .digest('hex');
  return expected === signature;
}

function verifyWebhookSignature(body, signature) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
  if (!webhookSecret) return false;
  const expected = crypto
    .createHmac('sha256', webhookSecret)
    .update(body)
    .digest('hex');
  return expected === signature;
}

// Create Razorpay order and save in DB
router.post('/create-order', async (req, res) => {
  try {
    const { amount, receipt = 'babycart_order', items = [] } = req.body;
    const amountInPaise = Math.round(Number(amount) * 100);

    if (!amountInPaise || amountInPaise < 100) {
      return res.status(400).json({ error: 'Invalid amount (min ₹1)' });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(503).json({
        error: 'Payment not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET (test keys) to server .env',
      });
    }

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: String(receipt),
    });

    await Order.create({
      razorpayOrderId: order.id,
      amount: order.amount,
      amountRupees: amountInPaise / 100,
      currency: order.currency || 'INR',
      receipt: String(receipt),
      status: 'created',
      items: Array.isArray(items) ? items : [],
    });

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error('Razorpay order error:', err);
    res.status(500).json({ error: 'Failed to create order', details: err.message });
  }
});

// Verify payment signature and update order in DB
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Missing payment details' });
    }

    const isValid = verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    if (!isValid) {
      return res.status(400).json({ success: false, error: 'Invalid signature' });
    }

    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { razorpayPaymentId: razorpay_payment_id, status: 'paid' },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.status(200).json({ success: true, orderId: order.razorpayOrderId, status: 'paid' });
  } catch (err) {
    console.error('Verify payment error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// List orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(100).lean();
    res.status(200).json(orders);
  } catch (err) {
    console.error('List orders error:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Webhook: must be mounted with raw body
function handleWebhook(req, res) {
  const signature = req.headers['x-razorpay-signature'];
  const rawBody = req.body;

  if (!rawBody || !signature) {
    return res.status(400).send('Bad request');
  }

  const bodyStr = typeof rawBody === 'string' ? rawBody : rawBody.toString('utf8');
  if (!verifyWebhookSignature(bodyStr, signature)) {
    console.warn('Webhook signature verification failed');
    return res.status(400).send('Invalid signature');
  }

  let event;
  try {
    event = JSON.parse(bodyStr);
  } catch (e) {
    return res.status(400).send('Invalid JSON');
  }

  const handleEvent = async () => {
    if (event.event === 'payment.captured') {
      const payment = event.payload?.payment?.entity;
      const orderId = payment?.order_id;
      const paymentId = payment?.id;
      if (orderId) {
        await Order.findOneAndUpdate(
          { razorpayOrderId: orderId },
          { razorpayPaymentId: paymentId || undefined, status: 'paid' }
        );
        console.log('Webhook: order', orderId, 'marked as paid');
      }
    } else if (event.event === 'order.paid') {
      const orderId = event.payload?.order?.entity?.id;
      const paymentId = event.payload?.payment?.entity?.id;
      if (orderId) {
        await Order.findOneAndUpdate(
          { razorpayOrderId: orderId },
          { razorpayPaymentId: paymentId || undefined, status: 'paid' }
        );
        console.log('Webhook: order', orderId, 'marked as paid');
      }
    }
  };

  handleEvent().catch((err) => console.error('Webhook handler error:', err));
  res.status(200).send('OK');
}

module.exports = router;
module.exports.handleWebhook = handleWebhook;
