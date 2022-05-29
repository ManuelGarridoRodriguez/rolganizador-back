import * as mongoose from 'mongoose';
import { Comments, CommentsSchema } from 'src/otherSchemas/comments.model';
import { Users, UsersSchema } from 'src/users/users.model';
import { Tags, TagsSchema } from '../tags/tags.model';

export const GameSchema = new mongoose.Schema({
  comments: [
    {
      type: CommentsSchema,
      body: 'Comments',
      required: true,
    },
  ],
  tags: [
    {
      type: TagsSchema,
      body: 'Tags',
      ref: 'Tags',
      required: true,
    },
  ],
  participants: [
    { type: UsersSchema, body: 'Users', ref: 'Users', required: true },
  ],
  description: { type: String, required: true },
  creator: {
    type: UsersSchema,
    ref: 'Users',
    required: true,
  },
  name: { type: String, required: true },
});

export interface Game extends mongoose.Document {
  id: string;
  comments: [Comments];
  tags: [Tags];
  participants: [Users];
  description: string;
  creator: Users;
  name: string;
}
