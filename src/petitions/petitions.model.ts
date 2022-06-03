import * as mongoose from 'mongoose';

export const PetitionsSchema = new mongoose.Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  status: { type: String },
  date: { type: Date },
});

export interface Petitions extends mongoose.Document {
  id: string;
  game: string;
  user: string;
  status: string;
  date: Date;
}
