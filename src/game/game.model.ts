import * as mongoose from 'mongoose';
import { Comments } from 'src/otherSchemas/comments.model';
import { Tags, TagsSchema } from '../tags/tags.model';

export const GameSchema = new mongoose.Schema({
  comments: { type: Object },
  tags: [
    {
      type: TagsSchema,
      body: 'Tags',
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
  tags: [Tags];
  participants: Array<string>;
  description: string;
  creator: string;
  name: string;
}
