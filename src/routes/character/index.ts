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

/* Find by Id */
import FindByIdCharacterService from '@/services/character/findById';
import FindByIdCharacterRoute from '@/routes/character/findById';

const findByIdCharacterService = new FindByIdCharacterService(characterRepository);
const findByIdCharacterRoute = new FindByIdCharacterRoute(findByIdCharacterService);

export default {
  create: (req: Request, res: Response) => createCharacterRoute.controller(req, res),
  list: (req: Request, res: Response) => listCharacterRoute.controller(req, res),
  findById: (req: Request, res: Response) => findByIdCharacterRoute.controller(req, res)
};
