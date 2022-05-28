import * as mongoose from 'mongoose';

export const GameSchema = new mongoose.Schema({
  coments: {type: String, required: true},
  tags: {type: --, required: true},
  participants: {type: --, required: true},
  description: {type: String, required: true},
  creator: {type: --, required: true},
  name: {type: String, required: true},
});

export class Game {
  constructor(public id: string, public coments: string[], public tags: --, public participants: --[], public description: string, public name: string) {}
}
