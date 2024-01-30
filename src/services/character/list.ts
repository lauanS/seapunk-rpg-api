import { iCharacterRepository } from '@/@types/character';
import { Service } from '@/services/protocols';

export default class ListCharacterService implements Service {
  constructor (
    private characterRepository: iCharacterRepository
  ) {}

  async execute () {
    return await this.characterRepository.list();
  }
}
