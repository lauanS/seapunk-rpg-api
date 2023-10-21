import express from 'express';
import character from '@/routes/character';

const router = express.Router();

/* POST */
router.post('/create', character.create);
router.post('/list', character.list);

export default router;
