import express from 'express';
import UserController from 'controllers/userController';

const routes = express.Router();

/* GET*/
routes.get('/users', UserController.getUsers);
routes.get('/users/:id', UserController.getUserbyId);
/* POST*/
routes.post('/users', UserController.createUser);
/* PUT*/
routes.put('/users/:id', UserController.updateUser);
/* DELETE*/
routes.delete('/users/:id', UserController.deleteUser);

export default routes;
