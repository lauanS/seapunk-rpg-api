interface createCharacterParams {
  name: string,
  race: string,
  class: Array<{ name: string, level: number }>
  origin: string,
  deity: string,
  level: number,
}
