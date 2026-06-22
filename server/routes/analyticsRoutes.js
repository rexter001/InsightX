import express from 'express';
import { protect } from '../middleware/auth.js';
import {
    getAnalytics,
    getAnalyticsById,
    createAnalytics,
    updateAnalytics,
    deleteAnalytics
} from '../controllers/analyticsController.js';

const router = express.Router();

router.route('/')
    .get(protect, getAnalytics)
    .post(protect, createAnalytics);

router.route('/:id')
    .get(protect, getAnalyticsById)
    .put(protect, updateAnalytics)
    .delete(protect, deleteAnalytics);

export default router;