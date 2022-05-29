import * as mongoose from 'mongoose';

export const TagsSchema = new mongoose.Schema({
  name: { type: String, requires: true },
});

export interface Tags extends mongoose.Document {
  name: string;
}
