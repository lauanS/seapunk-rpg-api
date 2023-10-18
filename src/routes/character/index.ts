import { Request, Response } from 'express';

import CreateCharacterRepository from '@repositories/character';
import CreateCharacterService from '@services/character/create';
import CreateCharacterRoute from '@routes/character/create';

const createCharacterRepository = new CreateCharacterRepository();
const createCharacterService = new CreateCharacterService(createCharacterRepository);
const createCharacterRoute = new CreateCharacterRoute(createCharacterService);

export default {
  create: (req: Request, res: Response) => createCharacterRoute.controller(req, res)
};
