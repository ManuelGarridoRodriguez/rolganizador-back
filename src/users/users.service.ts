import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './users.model';
import { UserDTO, UserRegisterDTO } from './users.dto';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>,
  ) {}

  async createUser(user: UserRegisterDTO): Promise<UserDTO> {
    const existUsernameAndEmail = await this.existByUsernameAndEmail(
      user.userNick,
      user.userEmail,
    );

    if (existUsernameAndEmail) {
      throw new Error('Su correo o nick ya están en uso.');
    }

    const hash = await bcrypt.hash(user.userPassword, saltOrRounds);

    const newUser = new this.usersModel({
      name: user.userName,
      email: user.userEmail,
      nick: user.userNick,
      password: hash,
      image: user.userImage,
    });

    const result = await newUser.save();

    return result;
  }

  async findUserByEmail(email: string) {
    return await this.usersModel.findOne({ email });
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  private async existByUsernameAndEmail(
    username: string,
    email: string,
  ): Promise<boolean> {
    const byUsername = await this.usersModel.findOne({ userNick: username });
    const byEmail = await this.usersModel.findOne({ email });
    return byUsername && byEmail ? true : false;
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
    const result = await this.usersModel.deleteOne({ id: userId }).exec();
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
