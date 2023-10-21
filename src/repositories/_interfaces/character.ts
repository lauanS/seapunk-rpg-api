export interface CharacterRepository {
  create(params: createCharacterParams): Promise<unknown>;
  list(): Promise<unknown>;
  findById(params: string): Promise<unknown>;
}
