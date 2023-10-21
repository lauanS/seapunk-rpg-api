import express from 'express';
import character from '@/routes/character';

const router = express.Router();

/* POST */
router.post('/create', character.create);
router.post('/list', character.list);
router.post('/find-by-id', character.findById);

export default router;
