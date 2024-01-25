import { iCreateUserParams, iUserRepository } from '@/@types/user';
import { Service } from '@/services/protocols';

export default class CreateUserService implements Service {
  constructor (
    private repository: iUserRepository
  ) {}

  async execute (params: iCreateUserParams) {
    try {
      const user = await this.repository.findByEmail(params.email);

      if (user) {
        throw 'E-mail em uso';
      }

      const createdCharacter = await this.repository.create(params);
      if (!createdCharacter) {
        throw 'Não foi possível cadastrar o usuário';
      }

      return 'Usuário cadastrado com sucesso';
    } catch (error) {
      console.log('Service error:', error);
      throw 'Erro no serviço';
    }
  }
}
