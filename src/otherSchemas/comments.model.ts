import * as mongoose from 'mongoose';

export const CommentsSchema = new mongoose.Schema({
  creator: { type: String, requires: true },
  message: { type: String, requires: true },
  date: { type: Date, requires: true },
});

export interface Comments extends mongoose.Document {
  creator: string;
  message: string;
  date: string;
}
