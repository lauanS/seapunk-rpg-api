import { ICharacter, ICharacterRepository, ICreateCharacterParams } from '@/@types/character';
import CharacterModel from '@/models/Character';

export default class implements ICharacterRepository {
  create(params: ICreateCharacterParams): Promise<ICharacter> {
    return CharacterModel.create(params);
  }

  list(): Promise<ICharacter[]> {
    return CharacterModel.find().exec();
  }

  findById(id: string): Promise<ICharacter | null> {
    return CharacterModel.findById(id).lean().exec();
  }
}
