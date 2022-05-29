import * as mongoose from 'mongoose';
import { Game, GameSchema } from 'src/game/game.model';
import { Users } from 'src/users/users.model';
import { UsersSchema } from '../users/users.model';

export const PetitionsSchema = new mongoose.Schema({
  game: { type: GameSchema, ref: 'Game', required: true },
  user: { type: UsersSchema, ref: 'Users', required: true },
  status: { type: String, required: true },
  date: { type: Date, required: true },
});

export interface Petitions extends mongoose.Document {
  id: string;
  game: Game;
  user: Users;
  status: string;
  date: Date;
}
