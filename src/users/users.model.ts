import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  nick: { type: String },
  password: { type: String },
  image: { type: String },
});

export interface Users extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  nick: string;
  password: string;
  image: string;
}
