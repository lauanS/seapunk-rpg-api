import { ICharacterRepository } from '@/@types/character';
import { Service } from '@/services/protocols';

export default class ListCharacterService implements Service {
  constructor (
    private characterRepository: ICharacterRepository
  ) {}

  async execute () {
    return await this.characterRepository.list();
  }
}
