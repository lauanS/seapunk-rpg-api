import { iCharacterRepository } from '@/@types/character';
import { Service } from '@/services/protocols';

export default class FindByIdCharacterService implements Service {
  constructor (
    private characterRepository: iCharacterRepository
  ) {}

  async execute (params: { id: string }) {
    try {
      const { id } = params;

      const foundCharacter = await this.characterRepository.findById(id);

      return foundCharacter;
    } catch (error) {
      console.log('Service error:', error);
      throw 'Erro no serviço';
    }
  }
}
