import express, { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import { errorMiddleware } from '@/middlewares/errorMiddleware';

import characterRouter from '@/routes/character/router';
import authRouter from '@/routes/auth/router';

const routes = (app: Express) => {
  app.route('/')
    .get((_req: Request, res: Response) => res.status(200).send('Seapunk RPG API'));

  app.use(express.json());
  app.use('/auth', authRouter);
  app.use('/character', characterRouter);
  app.use(errorMiddleware);
};

export default routes;
