import inMemoryDbConnect from '@/config/inMemoryDbConnect';
import UserRepository from '@/repositories/user';
import CreateUserService from '@/services/user/create';
import { BadRequestError } from '@/utils/ErrorHandler';
import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { clearDb } from '../utils/db';

describe('User: Create', () => {
  const defaultUser = {
    name: 'John doe',
    email: 'john@doe.com',
    password: '123abc'
  };

  const userRepository = new UserRepository();
  const createUserService = new CreateUserService(userRepository);

  beforeAll(async () => {
    await inMemoryDbConnect();
  });

  beforeEach(async () => {
    await clearDb();
  });

  test('Basic case', async () => {
    const body = { ...defaultUser };

    const serviceResponse = await createUserService.execute(body);

    expect(serviceResponse).toBe('Usuário cadastrado com sucesso');
  });

  test('E-mail invalid', async () => {
    const body = { ...defaultUser };

    body.email = 'john@doecom';

    await expect(createUserService.execute(body)).rejects.and.toThrow('E-mail inválido');
  });

  test('Name invalid', async () => {
    const body = { ...defaultUser };

    body.name = 'st';

    await expect(createUserService.execute(body)).rejects.and.toThrow(BadRequestError);
  });

  test('Password weak', async () => {
    const body = { ...defaultUser };

    const frontDecrypter = (str: string): string => str;
    const weakPassword = frontDecrypter(body.password);

    body.password = weakPassword;

    const serviceResponse = await createUserService.execute(body);

    expect(serviceResponse).toBe('Senha fraca');
  });

  test('E-mail already in use', async () => {
    const body = { ...defaultUser };

    await createUserService.execute(body);

    await expect(createUserService.execute(body)).rejects.and.toThrow('E-mail em uso');
  });
});
