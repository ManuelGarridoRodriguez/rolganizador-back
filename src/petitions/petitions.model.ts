import * as mongoose from 'mongoose';

export const PetitionsSchema = new mongoose.Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  receptor: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  status: { type: String },
  date: { type: Date },
});

export interface Petitions extends mongoose.Document {
  id: string;
  game: string;
  sender: string;
  receptor: string;
  status: string;
  date: Date;
}
