import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  nick: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
});

export interface Users extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  nick: string;
  password: string;
  image: string;
}
