import express from 'express';
import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import characters from './character';
import users from './user';

const routes = (app: Express) => {
  app.route('/')
    .get((req: Request, res: Response) => res.status(200).send('Seapunk RPG'));
  app.use(express.json(), characters, users);
};

export default routes;
