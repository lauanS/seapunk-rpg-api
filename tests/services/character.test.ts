import CreateCharacterService from '@/services/character/create';
import { expect, test } from 'vitest';

test('Create a character', async () => {
  const db = [];
  const createCharacterRepository = {
    create: (params: createCharacterParams) => {
      return new Promise<unknown>((resolve) => {
        db.push(params);
        resolve(params);
      });
    }
  };

  const params = {
    name: 'Francisco',
    race: 'Kliren',
    class: [{
      name: 'Inventor',
      level: 1
    }],
    origin: 'Marine',
    deity: 'Tannah Tho',
    level: 1
  };

  const createCharacterService = new CreateCharacterService(createCharacterRepository);

  expect(createCharacterService).toBeInstanceOf(CreateCharacterService);

  const serviceResult = await createCharacterService.execute(params);

  expect(serviceResult).toBe('Personagem cadastrado com sucesso');
});
