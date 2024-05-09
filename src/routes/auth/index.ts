import { Request, Response } from 'express';

import UserRepository from '@/repositories/user';
const userRepository = new UserRepository();

/* Register */
import RegisterAuthService from '@/services/auth/register';
import RegisterAuthRoute from '@/routes/auth/register';

const registerAuthService = new RegisterAuthService(userRepository);
const registerAuthRoute = new RegisterAuthRoute(registerAuthService);

/* Login */
import LoginAuthService from '@/services/auth/login';
import LoginAuthRoute from '@/routes/auth/login';

const loginAuthService = new LoginAuthService(userRepository);
const loginAuthRoute = new LoginAuthRoute(loginAuthService);

export default {
  login: (req: Request, res: Response) => loginAuthRoute.controller(req, res),
  register: (req: Request, res: Response) => registerAuthRoute.controller(req, res)
};
