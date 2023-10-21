import { Request, Response } from 'express';

import CharacterRepository from '@/repositories/character';
const characterRepository = new CharacterRepository();

/* Create */
import CreateCharacterService from '@/services/character/create';
import CreateCharacterRoute from '@/routes/character/create';

const createCharacterService = new CreateCharacterService(characterRepository);
const createCharacterRoute = new CreateCharacterRoute(createCharacterService);

/* List */
import ListCharacterService from '@/services/character/list';
import ListCharacterRoute from '@/routes/character/list';

const listCharacterService = new ListCharacterService(characterRepository);
const listCharacterRoute = new ListCharacterRoute(listCharacterService);

export default {
  create: (req: Request, res: Response) => createCharacterRoute.controller(req, res),
  list: (req: Request, res: Response) => listCharacterRoute.controller(req, res)
};
