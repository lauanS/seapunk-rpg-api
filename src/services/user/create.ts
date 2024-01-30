import { iCreateUserParams, iUserRepository } from '@/@types/user';
import { ElegantError } from '@/utils/ErrorHandler';
import { Service } from '@/services/protocols';
import { encryptPassword } from '@/utils/crypto';

export default class CreateUserService implements Service {
  constructor (
    private repository: iUserRepository
  ) {}

  async execute (params: iCreateUserParams) {
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
}
