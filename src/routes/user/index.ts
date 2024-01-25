import { Request, Response } from 'express';

import UserRepository from '@/repositories/user';
const userRepository = new UserRepository();

/* Create */
import CreateUserService from '@/services/user/create';
import CreateUserRoute from '@/routes/user/create';

const createUserService = new CreateUserService(userRepository);
const createUserRoute = new CreateUserRoute(createUserService);

export default {
  create: (req: Request, res: Response) => createUserRoute.controller(req, res)
};
