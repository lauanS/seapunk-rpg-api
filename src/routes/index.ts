import express from 'express';
import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';

import characterRouter from '@/routes/character/router';
import userRouter from '@/routes/user/router';

const routes = (app: Express) => {
  app.route('/')
    .get((_req: Request, res: Response) => res.status(200).send('Seapunk RPG API'));

  app.use(express.json());
  app.use('/character', characterRouter);
  app.use('/user', userRouter);
};

export default routes;
