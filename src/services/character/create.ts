import { CharacterRepository } from '@repositories/_interfaces/character';
import { Service } from '@services/index';

export default class CreateCharacterService implements Service {
  constructor (
    private characterRepository: CharacterRepository
  ) {}

  async execute (params: createCharacterParams) {
    try {
      const createdCharacter = await this.characterRepository.create(params);

      if (!createdCharacter) {
        throw 'Não foi possível cadastrar o personagem';
      }

      return 'Personagem cadastrado com sucesso';
    } catch (error) {
      console.log('Service error:', error);
      throw 'Erro no serviço';
    }
  }
}
