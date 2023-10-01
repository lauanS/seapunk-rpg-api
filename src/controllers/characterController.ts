import Character from "../models/Character";
import { Request, Response } from "express";

class CharacterController {

    static async getCharacters(req: Request, res: Response): Promise<void> {
        const characterList = await Character.find({}).exec();
        res.status(200).json(characterList);
    }

    static async createCharacter(req: Request, res: Response): Promise<void> {
        try {
            const newCharacter = await Character.create(req.body)
            res.status(201).json({
                message: "Character was successfully created!",
                character: newCharacter
            })
        } catch (er: any) {
            res.status(500).json({ message: `${er.message} - falha ao cadastrar personagem`});
        }
    }
}

export default CharacterController;
  