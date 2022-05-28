import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  nick: { type: String, required: true },
  password: { type: String, required: true },
});

// COMENTAR ESTO DE ABAJO (EL EXTEND PARA LAS FUNCIONES DE SAVE)

export interface Users extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  nick: string;
  password: string;
}
