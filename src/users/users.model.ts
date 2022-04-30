import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  nombre: String,
});

export class Users {
  constructor(public id: string, public nombre: string) {}
}
