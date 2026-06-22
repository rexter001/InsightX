import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('InsightX Analytics API is operational.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server executing in ${process.env.NODE_ENV} mode on port ${PORT}`));