import { iCharacterRepository, iCreateCharacterParams } from '@/@types/character';
import { Service } from '@/services/protocols';

export default class CreateCharacterService implements Service {
  constructor (
    private characterRepository: iCharacterRepository
  ) {}

  async execute (params: iCreateCharacterParams) {
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
