import { CharacterRepository } from '@/repositories/_interfaces/character';
import { Service } from '@/services';

export default class FindByIdCharacterService implements Service {
  constructor (
    private characterRepository: CharacterRepository
  ) {}

  async execute (params: string) {
    try {
      const characterFound = await this.characterRepository.findById(params);

      if(!characterFound) throw 'Personagem não encontrado';

      return characterFound;
    } catch (error) {
      console.log('Service error:', error);
      throw 'Erro no serviço';
    }
  }
}
