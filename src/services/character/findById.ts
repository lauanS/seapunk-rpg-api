import { ICharacterRepository } from '@/@types/character';
import { BadRequestError } from '@/utils/ErrorHandler';
import { Service } from '@/services/protocols';
import { z } from 'zod';

export default class FindByIdCharacterService implements Service {
  constructor (
    private characterRepository: ICharacterRepository
  ) {}

  async execute (params: { characterId: string }) {
    params = this.validate(params);

    const { characterId } = params;

    const foundCharacter = await this.characterRepository.findById(characterId);

    return foundCharacter;
  }

  private validate (params: unknown): { characterId: string } {
    const schemaValidator = z.object({
      characterId: z.string()
    });

    const bodyParsed = schemaValidator.safeParse(params);

    if (!bodyParsed.success) {
      throw new BadRequestError('As informações fornecidas são inválidas');
    }

    return bodyParsed.data;
  }
}
