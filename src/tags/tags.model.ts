import * as mongoose from 'mongoose';

export const TagsSchema = new mongoose.Schema({
  name: { type: String },
});

export interface Tags extends mongoose.Document {
  name: string;
}
