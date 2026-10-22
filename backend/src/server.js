import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB, isDbConnected } from './config/db.js';
import contentRoutes from './routes/contentRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware: Enable CORS for frontend requests
app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
  })
);

// Middleware: Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static directory for uploaded images
const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

// API Health Check & Database Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'MILAN Clothing Brand Backend API',
    databaseConnected: isDbConnected(),
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    endpoints: {
      content: '/api/content',
      heroUpdate: 'PUT /api/content/hero',
      products: '/api/products',
      upload: 'POST /api/upload',
      orders: '/api/orders',
      newsletter: '/api/newsletter'
    }
  });
});

// Mount Routes
app.use('/api/content', contentRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api', orderRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

// Start Express Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  MILAN Clothing Brand Backend API Server Running!`);
  console.log(`  URL: http://localhost:${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`  Database Status: ${isDbConnected() ? 'CONNECTED' : 'WAITING FOR MONGO_URI'}`);
  console.log(`======================================================\n`);
});
