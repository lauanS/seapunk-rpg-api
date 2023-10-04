import express from 'express';
import CharacterController from '../controllers/characterController';

const routes = express.Router();

/* GET*/
routes.get('/characters', CharacterController.getCharacters);
routes.get('/characters/busca', CharacterController.getCharacetersByName); // no express, a ordem das rotas importa. Se essa rota estivesse antes da rota /characters/:id, ela seria interpretada como um id
routes.get('/characters/:id', CharacterController.getCharacterbyId);
/* POST*/
routes.post('/characters', CharacterController.createCharacter);
/* PUT*/
routes.put('/characters/:id', CharacterController.updateCharacter);
/* DELETE*/
routes.delete('/characters/:id', CharacterController.deleteCharacter);


export default routes;
