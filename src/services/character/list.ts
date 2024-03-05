import { iCharacterRepository } from '@/@types/character';
import { Service } from '@/services/protocols';

export default class ListCharacterService implements Service {
  constructor (
    private characterRepository: iCharacterRepository
  ) {}

  async execute () {
    try {
      return await this.characterRepository.list();
    } catch (error) {
      console.log('Service error:', error);
      throw 'Erro no serviço';
    }
  }
}
