import { iCharacterRepository, iCreateCharacterParams } from '@/@types/character';
import { ElegantError } from '@/utils/ErrorHandler';
import { Service } from '@/services/protocols';

export default class CreateCharacterService implements Service {
  constructor (
    private characterRepository: iCharacterRepository
  ) {}

  async execute (params: iCreateCharacterParams) {
    const createdCharacter = await this.characterRepository.create(params);

    if (!createdCharacter) {
      throw new ElegantError('Não foi possível cadastrar o personagem');
    }

    return 'Personagem cadastrado com sucesso';
  }
}
