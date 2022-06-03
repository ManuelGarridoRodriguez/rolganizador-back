import * as mongoose from 'mongoose';
import { Comments } from 'src/otherSchemas/comments.model';

export const GameSchema = new mongoose.Schema({
  comments: { type: Object },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tags',
    },
  ],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
  description: { type: String },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  name: { type: String },
});

export interface Game extends mongoose.Document {
  id: string;
  comments: Array<Comments>;
  tags: Array<string>;
  participants: Array<string>;
  description: string;
  creator: string;
  name: string;
}
