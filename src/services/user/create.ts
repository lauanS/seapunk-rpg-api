import { iCreateUserParams, iUserRepository } from '@/@types/user';
import { BadRequestError, ElegantError } from '@/utils/ErrorHandler';
import { Service } from '@/services/protocols';
import { encryptPassword } from '@/utils/crypto';
import { z } from 'zod';

export default class CreateUserService implements Service {
  constructor (
    private repository: iUserRepository
  ) {}

  async execute (params: iCreateUserParams) {
    params = this.validate(params);

    const user = await this.repository.findByEmail(params.email);

    if (user) {
      throw new ElegantError('E-mail em uso');
    }

    params.password = await encryptPassword(params.password);

    const createdCharacter = await this.repository.create(params);
    if (!createdCharacter) {
      throw new ElegantError('Não foi possível cadastrar o usuário');
    }

    return 'Usuário cadastrado com sucesso';
  }

  private validate (params: unknown): iCreateUserParams {
    const schemaValidator = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string()
    });

    const bodyParsed = schemaValidator.safeParse(params);

    if (!bodyParsed.success) {
      throw new BadRequestError('As informações fornecidas são inválidas');
    }

    return bodyParsed.data;
  }
}
