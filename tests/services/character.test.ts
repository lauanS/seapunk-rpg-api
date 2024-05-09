import { ICharacter } from '@/@types/character';
import { describe, expect, test } from 'vitest';

import CharacterRepository from '@/repositories/_inMemoryDb/character';
import CreateCharacterService from '@/services/character/create';
import ListCharacterService from '@/services/character/list';
import FindByIdCharacterService from '@/services/character/findById';

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

describe('Character: Create', () => {
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

describe('Character: List', () => {
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

describe('Character: Find by id', () => {
  test('Basic case', async () => {
    /* Setup */
    const characterRepository = new CharacterRepository();
    const createCharacterService = new CreateCharacterService(characterRepository);
    const listCharacterService = new ListCharacterService(characterRepository);
    const findByIdCharacterService = new FindByIdCharacterService(characterRepository);

    /* Searching for N inserts */
    const nInserts = 5;

    for (let i = 0; i < nInserts; i++) {
      await createCharacterService.execute(defaultCharacter);
    }

    const listedCharacters = await listCharacterService.execute();

    listedCharacters.forEach(async (character: ICharacter) => {
      const searchParams = {
        characterId: character._id.toString()
      };

      const foundCharacter = await findByIdCharacterService.execute(searchParams);

      expect(foundCharacter?._id).equals(character._id);
    });
  });

  test('Searching for characters that do not exist', async () => {
    /* Setup */
    const characterRepository = new CharacterRepository();
    const findByIdCharacterService = new FindByIdCharacterService(characterRepository);

    const searchParams = {
      characterId: 'invalid-id'
    };

    const foundCharacter = await findByIdCharacterService.execute(searchParams);

    expect(foundCharacter).toBe(null);
  });
});
