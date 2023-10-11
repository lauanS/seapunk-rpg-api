import { Schema, model } from 'mongoose';

const CharacterSchema = new Schema({
  name: { type: 'string', required: true },
  avatar: { type: 'string' },
  race: { type: 'string' },
  class: [
    {
      name: { type: 'string' },
      level: { type: 'number' }
    }
  ],
  origin: { type: 'string' },
  deity: { type: 'string' },
  level: { type: 'number' },

  movement: [
    {
      terrain: { type: 'string' },
      distance: { type: 'string' }
    }
  ],
  size: { type: 'string' },
  // Anotação rápida disponível na ficha
  note: { type: 'string' },

  health: {
    current: { type: 'number' },
    total: { type: 'number' },
    temp: { type: 'number' }
  },
  mana: {
    current: { type: 'number' },
    total: { type: 'number' },
    temp: { type: 'number' }
  },

  atributes: {
    str: { type: 'number' },
    dex: { type: 'number' },
    con: { type: 'number' },
    int: { type: 'number' },
    wis: { type: 'number' },
    cha: { type: 'number' }
  },
  // Utilizado para calcular o CD de uma mágia
  magicKeyAtribute: { type: 'string', enum: ['str', 'dex', 'con', 'int', 'wis', 'cha'] },

  defense: { type: 'number' },

  skills: [
    {
      name: { type: 'string' },
      isTrained: { type: 'boolean' },
      other: { type: 'number' },
      modifier: { type: 'string', enum: ['str', 'dex', 'con', 'int', 'wis', 'cha'] }
    }
  ],

  status: [
    {
      name: { type: 'string' },
      description: { type: 'string' },
      icon: { type: 'string' }
    }
  ]
}, { versionKey: false });

const Character = model('character', CharacterSchema);

export default Character;
