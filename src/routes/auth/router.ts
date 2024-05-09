import express from 'express';
import authRoutes from '@/routes/auth';

const router = express.Router();

router.post('/login', authRoutes.login);
router.post('/register', authRoutes.register);

export default router;
