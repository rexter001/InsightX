import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import { getAdminStats, getUsers } from '../controllers/adminController.js';

const router = express.Router();

router.get('/stats', protect, adminOnly, getAdminStats);
router.get('/users', protect, adminOnly, getUsers);

export default router;