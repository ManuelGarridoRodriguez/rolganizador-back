import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Users } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>,
  ) {}

  async createUser(
    name: string,
    email: string,
    nick: string,
    password: string,
    image: string,
  ) {
    const newUser = new this.usersModel({
      name,
      email,
      nick,
      password,
      image,
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async getUsers() {
    const users = await this.usersModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      nick: user.nick,
      image: user.image,
    }));
  }

  async getSingleUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      nick: user.nick,
      image: user.image,
    };
  }

  async updateUser(
    userId: string,
    name: string,
    email: string,
    nick: string,
    password: string,
  ) {
    const updatedUser = await this.findUser(userId);
    if (name) {
      updatedUser.name = name;
    }
    if (email) {
      updatedUser.email = email;
    }
    if (nick) {
      updatedUser.nick = nick;
    }
    if (password) {
      updatedUser.password = password;
    }
    updatedUser.save();
  }

  async deleteUser(userId: string) {
    const result = await this.usersModel.deleteOne({ _id: userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(
        'No se ha encontrado el usuario que deseaba borrar',
      );
    }
  }

  private async findUser(id: string): Promise<Users> {
    let user;
    try {
      user = await this.usersModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('No se ha encontrado el usuario.');
    }
    if (!user) {
      throw new NotFoundException('No se ha encontrado el usuario');
    }
    return user;
  }
}
