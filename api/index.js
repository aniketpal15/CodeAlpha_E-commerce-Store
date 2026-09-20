const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const errorHandler = require('../server/middleware/errorHandler');
const connectDB = require('../server/config/db');

dotenv.config({ path: path.join(__dirname, '..', 'server', '.env') });
dotenv.config();

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to DB before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error('DB connect error in middleware:', err);
  }
  next();
});

// Root & Health checks
app.get(['/api/health', '/health'], (req, res) => res.json({ status: 'NexaShop API running ✅' }));
app.get(['/api', '/'], (req, res) => res.json({ status: 'NexaShop API running ✅', version: '1.0.0' }));

// Routes (support both /api/* and /*)
const authRoutes = require('../server/routes/authRoutes');
const productRoutes = require('../server/routes/productRoutes');
const orderRoutes = require('../server/routes/orderRoutes');
const userRoutes = require('../server/routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/products', productRoutes);
app.use('/products', productRoutes);

app.use('/api/orders', orderRoutes);
app.use('/orders', orderRoutes);

app.use('/api/users', userRoutes);
app.use('/users', userRoutes);

app.use(errorHandler);

module.exports = app;

