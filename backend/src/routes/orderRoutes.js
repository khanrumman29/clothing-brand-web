import express from 'express';
import { createOrder, getAllOrders, subscribeNewsletter } from '../controllers/orderController.js';

const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders', getAllOrders);
router.post('/newsletter', subscribeNewsletter);

export default router;
