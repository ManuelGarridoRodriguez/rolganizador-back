import { TagsDTO } from '../tags/tags.dto';
import { UserDTO } from '../users/users.dto';

export interface GameDTO {
  comments: Array<CommentsDTO>;
  tags: Array<TagsDTO>;
  participants: Array<UserDTO>;
  description: string;
  creator: UserDTO;
  name: string;
  image: string;
}

interface CommentsDTO {
  creator: string;
  message: string;
  date: string;
}

export interface CreateGameDTO {
  tags: Array<string>;
  description: string;
  creator: string;
  name: string;
  image: string;
}

export interface UpdateGameDTO {
  comments: Array<CommentsDTO>;
  tags: Array<TagsDTO>;
  participants: Array<string>;
  description: string;
  name: string;
  image: string;
}
