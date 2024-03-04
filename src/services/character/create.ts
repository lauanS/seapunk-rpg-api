import { ICharacterRepository, ICreateCharacterParams } from '@/@types/character';
import { BadRequestError, ElegantError } from '@/utils/ErrorHandler';
import { Service } from '@/services/protocols';
import { z } from 'zod';

export default class CreateCharacterService implements Service {
  constructor (
    private characterRepository: ICharacterRepository
  ) {}

  async execute (params: ICreateCharacterParams) {
    params = this.validate(params);

    const createdCharacter = await this.characterRepository.create(params);

    if (!createdCharacter) {
      throw new ElegantError('Não foi possível cadastrar o personagem');
    }

    return 'Personagem cadastrado com sucesso';
  }

  private validate (params: unknown): ICreateCharacterParams {
    const schemaValidator = z.object({
      name: z.string(),
      race: z.string(),
      class: z.array(z.object(
        {
          name: z.string(),
          level: z.number()
        }
      )),
      origin: z.string(),
      deity: z.string(),
      level: z.number(),
    });

    const bodyParsed = schemaValidator.safeParse(params);

    if (!bodyParsed.success) {
      throw new BadRequestError('As informações fornecidas são inválidas');
    }

    return bodyParsed.data;
  }
}
