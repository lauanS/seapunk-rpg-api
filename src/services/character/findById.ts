import { ICharacterRepository } from '@/@types/character';
import { BadRequestError } from '@/utils/ErrorHandler';
import { Service } from '@/services/protocols';
import { z } from 'zod';

export default class FindByIdCharacterService implements Service {
  constructor (
    private characterRepository: ICharacterRepository
  ) {}

  async execute (params: { id: string }) {
    params = this.validate(params);

    const { id } = params;

    const foundCharacter = await this.characterRepository.findById(id);

    return foundCharacter;
  }

  private validate (params: unknown): { id: string } {
    const schemaValidator = z.object({
      id: z.string()
    });

    const bodyParsed = schemaValidator.safeParse(params);

    if (!bodyParsed.success) {
      throw new BadRequestError('As informações fornecidas são inválidas');
    }

    return bodyParsed.data;
  }
}
