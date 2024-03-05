import express from 'express';
import characterRoutes from '@/routes/character';

const router = express.Router();

router.post('/create', characterRoutes.create);
router.post('/list', characterRoutes.list);
router.post('/find-by-id', characterRoutes.findById);

export default router;
