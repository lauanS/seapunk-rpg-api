import { iCharacter, iCharacterRepository, iCreateCharacterParams } from '@/@types/character';

export default class implements iCharacterRepository {
  private db:iCharacter[] = [];
  private idCount:number = 0;

  create(params: iCreateCharacterParams): Promise<iCharacter> {
    return new Promise<iCharacter>((resolve) => {
      const newCharacter:iCharacter = { _id: this.idCount.toString(), ...params };

      this.db.push(newCharacter);
      this.idCount++;

      resolve(newCharacter);
    });
  }

  list(): Promise<iCharacter[]> {
    return new Promise<iCharacter[]>((resolve) => resolve(this.db));
  }

  findById(id: string): Promise<iCharacter|null> {
    return new Promise<iCharacter|null>((resolve) => {
      const foundCharacter = this.db.find((character: iCharacter) => {
        return character._id === id;
      });

      resolve(foundCharacter || null);
    });
  }
}
