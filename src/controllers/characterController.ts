import Character from "../models/Character";
import { Request, Response } from "express";

class CharacterController {

    static async getCharacters(req: Request, res: Response): Promise<void> {
        try{
            const characterList = await Character.find({}).exec();
            res.status(200).json(characterList);

        }
        catch(er: any){
            res.status(500).json({ message: `${er.message} - falha ao buscar personagens`});
        }
    }

    static async getCharacterbyId(req: Request, res: Response): Promise<void> {
        try{
            const id = req.params.id;
            const character = await Character.findById(id).exec();
            res.status(200).json(character);

        }
        catch(er: any){
            res.status(500).json({ message: `${er.message} - falha ao buscar personagen de id ${req.params.id}`});
        }
    }

    static async updateCharacter(req: Request, res: Response): Promise<void> {
        try{
            const id = req.params.id;
            await Character.findByIdAndUpdate(id, req.body).exec();
            res.status(200).json({message: `Personagem de id ${req.params.id} atualizado com sucesso`});

        }
        catch(er: any){
            res.status(500).json({ message: `${er.message} - falha ao atualizar personagen de id ${req.params.id}`});
        }
    }

    static async deleteCharacter(req: Request, res: Response): Promise<void> {
        try{
            const id = req.params.id;
            await Character.findByIdAndDelete(id, req.body).exec();
            res.status(200).json({message: `Personagem de id ${req.params.id} removido com sucesso`});

        }
        catch(er: any){
            res.status(500).json({ message: `${er.message} - falha ao remover personagen de id ${req.params.id}`});
        }
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
  