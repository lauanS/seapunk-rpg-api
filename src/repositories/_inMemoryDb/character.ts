import { ICharacter, ICharacterRepository, ICreateCharacterParams } from '@/@types/character';

export default class implements ICharacterRepository {
  private db:ICharacter[] = [];
  private idCount:number = 0;

  create(params: ICreateCharacterParams): Promise<ICharacter> {
    return new Promise<ICharacter>((resolve) => {
      const newCharacter:ICharacter = { _id: this.idCount.toString(), ...params };

      this.db.push(newCharacter);
      this.idCount++;

      resolve(newCharacter);
    });
  }

  list(): Promise<ICharacter[]> {
    return new Promise<ICharacter[]>((resolve) => resolve(this.db));
  }

  findById(id: string): Promise<ICharacter|null> {
    return new Promise<ICharacter|null>((resolve) => {
      const foundCharacter = this.db.find((character: ICharacter) => {
        return character._id === id;
      });

      resolve(foundCharacter || null);
    });
  }
}
