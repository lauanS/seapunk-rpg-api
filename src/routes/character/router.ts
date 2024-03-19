import express from 'express';
import characterRoutes from '@/routes/character';

const router = express.Router();

router.post('/create', characterRoutes.create);
router.get('/list', characterRoutes.list);
router.get('/find-by-id/:characterId', characterRoutes.findById);

export default router;
