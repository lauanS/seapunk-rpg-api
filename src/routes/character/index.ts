import express from 'express';
import CharacterCreate from 'routes/character/create';

const router = express.Router();

/* POST */
router.post('/create', CharacterCreate.validation, CharacterCreate.controller);

export default router;
