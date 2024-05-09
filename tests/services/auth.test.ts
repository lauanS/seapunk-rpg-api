import type { IUser } from '@/@types/user';
import inMemoryDbConnect from '@/config/inMemoryDbConnect';
import UserRepository from '@/repositories/user';
import RegisterAuthService from '@/services/auth/register';
import LoginAuthService from '@/services/auth/login';
import { BadRequestError } from '@/utils/ErrorHandler';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { clearDb } from '../utils/db';
import { signJwt } from '@/utils/crypto';

describe('Auth:', () => {
  beforeAll(async () => {
    await inMemoryDbConnect();
  });

  describe('Register', () => {
    const defaultUser = {
      name: 'John doe',
      email: 'john@doe.com',
      password: '123abc'
    };

    const userRepository = new UserRepository();
    const registerAuthService = new RegisterAuthService(userRepository);

    beforeEach(async () => {
      await clearDb();
    });

    test('Basic case', async () => {
      const body = { ...defaultUser };

      const serviceResponse = await registerAuthService.execute(body);

      expect(serviceResponse).toBe('Usuário cadastrado com sucesso');
    });

    test('E-mail invalid', async () => {
      const body = { ...defaultUser };

      body.email = 'john@doecom';

      await expect(registerAuthService.execute(body)).rejects.and.toThrow('E-mail inválido');
    });

    test('Name invalid', async () => {
      const body = { ...defaultUser };

      body.name = 'st';

      await expect(registerAuthService.execute(body)).rejects.and.toThrow(BadRequestError);
    });

    test('Password weak', async () => {
      const body = { ...defaultUser };

      const frontDecrypter = (str: string): string => str;
      const weakPassword = frontDecrypter(body.password);

      body.password = weakPassword;

      const serviceResponse = await registerAuthService.execute(body);

      expect(serviceResponse).toBe('Senha fraca');
    });

    test('E-mail already in use', async () => {
      const body = { ...defaultUser };

      await registerAuthService.execute(body);

      await expect(registerAuthService.execute(body)).rejects.and.toThrow('E-mail em uso');
    });
  });

  describe('Login', () => {
    const defaultUser = {
      name: 'John doe',
      email: 'john@doe.com',
      password: '123abc'
    };

    const userRepository = new UserRepository();
    const registerAuthService = new RegisterAuthService(userRepository);
    const loginAuthService = new LoginAuthService(userRepository);

    beforeEach(async () => {
      await clearDb();
    });

    test('Basic case', async () => {
      const registerBody = { ...defaultUser };
      const loginBody = {
        email: defaultUser.email,
        password: defaultUser.password
      };

      await registerAuthService.execute(registerBody);
      const serviceResponse = await loginAuthService.execute(loginBody);

      const user = await userRepository.findByEmail(registerBody.email) as IUser;

      const expectedToken = signJwt({ id: user._id, email: user.email, name: user.name });

      expect(serviceResponse).toBe(expectedToken);
    });

    test('E-mail invalid', async () => {
      const registerBody = { ...defaultUser };
      const loginBody = {
        email: 'email@unregistered.com',
        password: defaultUser.password
      };

      await registerAuthService.execute(registerBody);

      await expect(loginAuthService.execute(loginBody)).rejects.and.toThrow('Nenhum usuário cadastrado com o e-mail informado');
    });

    test('Wrong password', async () => {
      const registerBody = { ...defaultUser };
      const loginBody = {
        email: defaultUser.email,
        password: 'WRONG-PASSWORD'
      };

      await registerAuthService.execute(registerBody);

      await expect(loginAuthService.execute(loginBody)).rejects.and.toThrow('E-mail ou senha inválidos');
    });
  });
});

