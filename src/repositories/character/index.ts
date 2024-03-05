import { iCharacter, iCharacterRepository, iCreateCharacterParams } from '@/@types/character';
import CharacterModel from '@/models/Character';

export default class implements iCharacterRepository {
  create(params: iCreateCharacterParams): Promise<iCharacter> {
    return CharacterModel.create(params);
  }

  list(): Promise<iCharacter[]> {
    return CharacterModel.find().exec();
  }

  findById(id: string): Promise<iCharacter | null> {
    return CharacterModel.findById(id).lean().exec();
  }
}
