import express from 'express';
import userRoutes from '@/routes/user';

const router = express.Router();

router.post('/create', userRoutes.create);

export default router;
