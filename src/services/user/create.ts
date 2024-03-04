import { ICreateUserParams, IUserRepository } from '@/@types/user';
import { BadRequestError, ElegantError } from '@/utils/ErrorHandler';
import { Service } from '@/services/protocols';
import { encryptPassword } from '@/utils/crypto';
import { z } from 'zod';

export default class CreateUserService implements Service {
  constructor (
    private repository: IUserRepository
  ) {}

  async execute (params: ICreateUserParams) {
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

  private validate (params: unknown): ICreateUserParams {
    const schemaValidator = z.object({
      name: z.string()
        .min(3, 'O nome deve conter pelo menos 3 caracteres'),
      email: z.string()
        .email('E-mail inválido'),
      password: z.string()
        .min(1, 'Senha não informada')
    });

    const bodyParsed = schemaValidator.safeParse(params);

    if (!bodyParsed.success) {
      throw new BadRequestError(bodyParsed.error.errors[0].message);
    }

    return bodyParsed.data;
  }
}
