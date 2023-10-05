import Character from '../models/Character';
import { User } from '../models/User';
import { Request, Response } from 'express';

class CharacterController {
  static async create(req: Request, res: Response): Promise<void> {
    const newCharacter = req.body;

    try {
      const user = await User.findById(newCharacter.user).exec();
      const completeCharacter = { ...newCharacter, user: { ...user?.toObject() } }; // Usar toObject() é necessário para que o mongoose não reclame do tipo do user

      const createdCharacter = await Character.create(completeCharacter);
      res.status(201).json({
        message: 'Character was successfully created!',
        character: createdCharacter
      });
    } catch (er: unknown) {
      res.status(500).json({ message: `${er} - falha ao cadastrar personagem` });
    }
  }

  static async list(req: Request, res: Response): Promise<void> {
    try{
      const characterList = await Character.find({}).exec();
      res.status(200).json(characterList);

    }
    catch(er: unknown) {
      res.status(500).json({ message: `${er} - falha ao buscar personagens` });
    }
  }

  static async findById(req: Request, res: Response): Promise<void> {
    try{
      const id = req.params.id;
      const character = await Character.findById(id).exec();
      res.status(200).json(character);

    }
    catch(er: unknown) {
      res.status(500).json({ message: `${er} - falha ao buscar personagen de id ${req.params.id}` });
    }
  }

  static async updateById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      await Character.findByIdAndUpdate(id, req.body).exec();
      res.status(200).json({ message: `Personagem de id ${req.params.id} atualizado com sucesso` });

    }
    catch(er: unknown) {
      res.status(500).json({ message: `${er} - falha ao atualizar personagen de id ${req.params.id}` });
    }
  }

  static async deleteById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      await Character.findByIdAndDelete(id, req.body).exec();
      res.status(200).json({ message: `Personagem de id ${req.params.id} removido com sucesso` });

    }
    catch(er: unknown) {
      res.status(500).json({ message: `${er} - falha ao remover personagen de id ${req.params.id}` });
    }
  }

  static async listByName(req: Request, res: Response): Promise<void> {
    const charName = req.query.name;
    try{
      const characterList = await Character.find({ name: charName }).exec();
      res.status(200).json(characterList);

    } catch(er: unknown) {
      res.status(500).json({ message: `${er} - falha ao buscar personagens` });
    }
  }

}

export default CharacterController;
