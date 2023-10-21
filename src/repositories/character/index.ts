import { CharacterRepository } from '@/repositories/_interfaces/character';
import CharacterModel from '@/models/Character';

export default class implements CharacterRepository {
  create(params: createCharacterParams): Promise<unknown> {
    return CharacterModel.create(params);
  }

  list(): Promise<unknown> {
    return CharacterModel.find().exec();
  }

  findById(params: string): Promise<unknown> {
    return CharacterModel.findById(params).exec();
  }
}
