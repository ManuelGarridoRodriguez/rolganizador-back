import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, UserLoginDTO, UserRegisterDTO } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @HttpCode(201)
  async register(@Body() userRegisterDTO: UserRegisterDTO) {
    const user: UserDTO = await this.usersService.createUser(userRegisterDTO);
    return user;
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() userLoginDTO: UserLoginDTO) {
    const user = await this.usersService.findUserByEmail(userLoginDTO.email);

    if (!user) {
      throw new Error('El usuario no existe');
    }

    const isPasswordCorrect = await this.usersService.comparePasswords(
      userLoginDTO.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new Error('El email o la contraseña son incorrectos');
    }

    return user;
  }

  @Get('')
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
    @Body('nick') userNick: string,
    @Body('password') userPassword: string,
    @Body('image') userImage: string,
  ) {
    const updatedUser = await this.usersService.updateUser(
      userId,
      userNick,
      userPassword,
      userImage,
    );
    return updatedUser;
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
    await this.usersService.deleteUser(userId);
    return null;
  }
}
