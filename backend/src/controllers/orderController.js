import { Order } from '../models/Order.js';
import { Subscriber } from '../models/Subscriber.js';
import { isDbConnected } from '../config/db.js';

let inMemoryOrders = [];
let inMemorySubscribers = [];

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Public
 */
export const createOrder = async (req, res) => {
  try {
    const { items, customer, subtotal, discount, shippingFee, totalAmount, promoCodeUsed } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart items cannot be empty' });
    }

    const orderNumber = `MILAN-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

    const orderPayload = {
      orderNumber,
      items,
      customer: customer || { name: 'Valued Customer' },
      subtotal: subtotal || 0,
      discount: discount || 0,
      shippingFee: shippingFee || 0,
      totalAmount: totalAmount || subtotal,
      promoCodeUsed: promoCodeUsed || '',
      status: 'Confirmed'
    };

    if (isDbConnected()) {
      const order = await Order.create(orderPayload);
      return res.status(201).json({
        success: true,
        message: 'Order created successfully in Database',
        data: order
      });
    }

    inMemoryOrders.unshift({ ...orderPayload, _id: `mem-${Date.now()}`, createdAt: new Date() });
    res.status(201).json({
      success: true,
      message: 'Order received (Saved in Memory)',
      data: inMemoryOrders[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get all orders (Admin)
 * @route   GET /api/orders
 * @access  Admin
 */
export const getAllOrders = async (req, res) => {
  try {
    if (isDbConnected()) {
      const orders = await Order.find({}).sort({ createdAt: -1 });
      return res.json({ success: true, count: orders.length, data: orders });
    }

    res.json({ success: true, count: inMemoryOrders.length, data: inMemoryOrders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Subscribe newsletter
 * @route   POST /api/newsletter
 * @access  Public
 */
export const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid email is required' });
  }

  try {
    if (isDbConnected()) {
      await Subscriber.findOneAndUpdate(
        { email },
        { email, active: true },
        { upsert: true, new: true }
      );
      return res.json({ success: true, message: 'Subscribed successfully in Database' });
    }

    if (!inMemorySubscribers.includes(email)) {
      inMemorySubscribers.push(email);
    }
    res.json({ success: true, message: 'Subscribed successfully in Memory' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
