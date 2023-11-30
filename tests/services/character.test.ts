import CreateCharacterService from '@/services/character/create';
import ListCharacterService from '@/services/character/list';
import CharacterRepository from '@/repositories/inMemoryDb/character';

import { describe, expect, test } from 'vitest';

const defaultCharacter = {
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

describe('Create character', () => {
  test('Basic case', async () => {
    const characterRepository = new CharacterRepository();
    const createCharacterService = new CreateCharacterService(characterRepository);

    expect(createCharacterService).toBeInstanceOf(CreateCharacterService);

    const serviceResult = await createCharacterService.execute(defaultCharacter);

    expect(serviceResult).toBe('Personagem cadastrado com sucesso');
  });

  test('Check insertions', async () => {
    /* Setup */
    const characterRepository = new CharacterRepository();
    const createCharacterService = new CreateCharacterService(characterRepository);
    const listCharacterService = new ListCharacterService(characterRepository);

    /* First insertion */
    await createCharacterService.execute(defaultCharacter);

    let listedCharacters = (await listCharacterService.execute()) as Array<unknown>;

    expect(listedCharacters).instanceOf(Array);
    expect(listedCharacters.length).equals(1);

    /* Second insertion */
    await createCharacterService.execute(defaultCharacter);
    listedCharacters = (await listCharacterService.execute()) as Array<unknown>;

    expect(listedCharacters).instanceOf(Array);
    expect(listedCharacters.length).equals(2);
  });
});

describe('List character', () => {
  test('Basic case', async () => {
    /* Setup */
    const characterRepository = new CharacterRepository();
    const createCharacterService = new CreateCharacterService(characterRepository);
    const listCharacterService = new ListCharacterService(characterRepository);

    /* Checking listing for N inserts */
    const nInserts = 5;

    for (let i = 0; i < nInserts; i++) {
      await createCharacterService.execute(defaultCharacter);
    }

    const listedCharacters = (await listCharacterService.execute()) as Array<unknown>;

    expect(listedCharacters).instanceOf(Array);
    expect(listedCharacters.length).equals(nInserts);
  });
});
