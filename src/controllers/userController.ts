import {User} from '../models/User';
import { Request, Response } from 'express';

class UserController {

  static async getUsers(req: Request, res: Response): Promise<void> {
    try{
      const UserList = await User.find({}).exec();
      res.status(200).json(UserList);

    }
    catch(er: unknown) {
      res.status(500).json({ message: `${er} - falha ao buscar usuário`});
    }
  }

  static async getUserbyId(req: Request, res: Response): Promise<void> {
    try{
      const id = req.params.id;
      const user = await User.findById(id).exec();
      res.status(200).json(user);

    }
    catch(er: unknown) {
      res.status(500).json({ message: `${er} - falha ao buscar usuário de id ${req.params.id}`});
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try{
      const id = req.params.id;
      await User.findByIdAndUpdate(id, req.body).exec();
      res.status(200).json({message: `Usuário de id ${req.params.id} atualizado com sucesso`});

    }
    catch(er: unknown) {
      res.status(500).json({ message: `${er} - falha ao atualizar usuário de id ${req.params.id}`});
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try{
      const id = req.params.id;
      await User.findByIdAndDelete(id, req.body).exec();
      res.status(200).json({message: `Usuário de id ${req.params.id} removido com sucesso`});

    }
    catch(er: unknown) {
      res.status(500).json({ message: `${er} - falha ao remover usuário de id ${req.params.id}`});
    }
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json({
        message: 'User was successfully created!',
        User: newUser
      });
    } catch (er: unknown) {
      res.status(500).json({ message: `${er} - falha ao cadastrar personagem` });
    }
  }
}

export default UserController;
