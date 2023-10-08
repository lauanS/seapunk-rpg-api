import express from 'express';
import CharacterController from '../../controllers/characterController';

const routes = express.Router();

/* GET */
routes.get('/characters', CharacterController.list);
routes.get('/characters/busca', CharacterController.listByName); // No express, a ordem das rotas importa. Se essa rota estivesse antes da rota /characters/:id, ela seria interpretada como um id
routes.get('/characters/:id', CharacterController.findById);

/* POST */
routes.post('/characters', CharacterController.create);

/* PUT */
routes.put('/characters/:id', CharacterController.updateById);

/* DELETE */
routes.delete('/characters/:id', CharacterController.deleteById);

export default routes;
