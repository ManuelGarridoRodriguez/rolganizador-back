import * as mongoose from 'mongoose';

export const PetitionsSchema = new mongoose.Schema({
  game:  { type: --, required: true},
  user: { type: --, required: true},
  status: { type: String, required: true},
  date: { type: Date, required: true},
});

export class Petitions {
  constructor(public id: string, public game: --, public user: --, public status: string, public date: Date) {}
}
