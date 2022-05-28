import * as mongoose from 'mongoose';

export const TagsSchema = new mongoose.Schema({
  name: { type: String, requires: true },
});

export class Tags {
  constructor(public id: string, public name: string) {}
}
