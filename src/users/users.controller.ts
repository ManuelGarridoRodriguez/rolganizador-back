import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('name') userName: string,
    @Body('email') userEmail: string,
    @Body('nick') userNick: string,
    @Body('password') userPassword: string,
  ) {
    const generateId = await this.usersService.createUser(
      userName,
      userEmail,
      userNick,
      userPassword,
    );
    return { id: generateId };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':id')
  async getUser(@Param('id') userId: string) {
    return await this.usersService.getSingleUser(userId);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('name') userName: string,
    @Body('email') userEmail: string,
    @Body('nick') userNick: string,
    @Body('password') userPassword: string,
  ) {
    await this.usersService.updateUser(
      userId,
      userName,
      userEmail,
      userNick,
      userPassword,
    );
    return null;
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
    await this.usersService.deleteUser(userId);
    return null;
  }
}
