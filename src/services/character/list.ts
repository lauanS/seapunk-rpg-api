import { CharacterRepository } from '@/repositories/_interfaces/character';
import { Service } from '@/services';

export default class ListCharacterService implements Service {
  constructor (
    private characterRepository: CharacterRepository
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
