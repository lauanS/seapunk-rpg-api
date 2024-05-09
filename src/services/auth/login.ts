import { IUserRepository } from '@/@types/user';
import { ILoginAuthParams } from '@/@types/auth';
import { Service } from '@/services/protocols';
import { BadRequestError, ElegantError } from '@/utils/ErrorHandler';
import { comparePassword, signJwt } from '@/utils/crypto';
import { z } from 'zod';

import UserRepository from '@/repositories/user';

export default class LoginAuthService implements Service {
  constructor (
    private repository: IUserRepository = new UserRepository()
  ) {}

  async execute (params: ILoginAuthParams) {
    params = this.validate(params);

    const user = await this.repository.findByEmail(params.email);

    if (!user) {
      throw new ElegantError('Nenhum usuário cadastrado com o e-mail informado');
    }

    const matchedPassword = await comparePassword(params.password, user.password);

    if (!matchedPassword) {
      throw new ElegantError('E-mail ou senha inválidos');
    }

    return signJwt({ id: user._id, email: user.email, name: user.name });
  }

  private validate (params: unknown): ILoginAuthParams {
    const schemaValidator = z.object({
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
