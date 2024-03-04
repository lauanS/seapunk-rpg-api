import { Types } from 'mongoose';

interface ICharacterRepository {
  create(params: ICreateCharacterParams): Promise<ICharacter>;
  list(): Promise<ICharacter[]>;
  findById(id: string): Promise<ICharacter|null>;
}

interface ICreateCharacterParams {
  name: string;
  race: string;
  class: Array<{ name: string; level: number }>;
  origin: string;
  deity: string;
  level: number;
}

interface ICharacter {
  _id: string | Types.ObjectId,
  name: string,
  race: string,
  class: Array<{ name: string, level: number }>
  origin: string,
  deity: string,
  level: number,
  avatar?: string,
  movement?: Array<{ terrain: string, distance: string }>,
  size?: string,
  note?: string,
  health?: {
    current: number
    total: number
    temp: number
  },
  mana?: {
    current: number
    total: number
    temp: number
  },
  atributes?: {
    str: number
    dex: number
    con: number
    int: number
    wis: number
    cha: number
  },
  magicKeyAtribute?: string,
  defense?: number,
  skills?: [
    {
      name: string
      isTrained: boolean
      other: number
      modifier: string
    }
  ],
  status?: [
    {
      name: string
      description: string
      icon: string
    }
  ]
}
