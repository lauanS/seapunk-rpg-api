export interface CharacterRepository {
  create(params: createCharacterParams): Promise<unknown>;
  list(): Promise<unknown>
}
