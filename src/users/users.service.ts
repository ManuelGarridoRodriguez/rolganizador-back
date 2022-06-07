import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './users.model';
import { UserDTO, UserRegisterDTO } from './users.dto';
import * as bcrypt from 'bcrypt';
import { GameService } from '../game/game.service';
import { PetitionsService } from 'src/petitions/petitions.service';

const saltOrRounds = 10;
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>,
    @Inject(GameService) private readonly gameService: GameService,
    @Inject(PetitionsService)
    private readonly petitionService: PetitionsService,
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
      createdDate: new Date(),
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

  async findUserByNick(nick: string) {
    return await this.usersModel.findOne({ nick });
  }

  private async existByUsername(username: string): Promise<boolean> {
    const byUsername = await this.usersModel.findOne({ nick: username });
    return byUsername ? true : false;
  }

  private async existByUsernameAndEmail(
    username: string,
    email: string,
  ): Promise<boolean> {
    const byUsername = await this.usersModel.findOne({ nick: username });
    const byEmail = await this.usersModel.findOne({ email: email });
    return byUsername || byEmail ? true : false;
  }

  async getUsers() {
    const users = await this.usersModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      nick: user.nick,
      image: user.image,
      createdDate: user.createdDate,
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
      createdDate: user.createdDate,
    };
  }

  async updateUser(
    userId: string,
    nick: string,
    password: string,
    image: string,
  ) {
    const updatedUser = await this.findUser(userId);
    const existByUsername = await this.existByUsername(nick);
    const actualUser = await this.findUserByNick(nick);

    if (
      existByUsername &&
      updatedUser._id.toString() !== actualUser._id.toString()
    ) {
      throw new Error('El nick ya están en uso.');
    } else {
      if (nick !== '') {
        updatedUser.nick = nick;
      }
      if (password) {
        const hash = await bcrypt.hash(password, saltOrRounds);
        updatedUser.password = hash;
      }
      if (image) {
        updatedUser.image = image;
      }
      const updated = updatedUser.save();
      return updated;
    }
  }

  async deleteUser(userId: string) {
    const userGames = await this.gameService.findGamesByKey('creator', userId);
    const participantGame = await this.gameService.findGamesByKey(
      'participants',
      userId,
    );
    const petitions = await this.petitionService.getPetitionsByUser(userId);

    if (userGames.length) {
      for (const game of userGames) {
        await this.gameService.deleteGame(game._id);
      }
    }

    if (participantGame.length) {
      for (const game of participantGame) {
        const newParticipants = game.participants.filter(
          (participant) => participant !== userId,
        );
        game.participants = newParticipants;
        await this.gameService.updateGame(game._id, game);
      }
    }

    if (petitions.length) {
      for (const petition of petitions) {
        petition.status = 'user deleted';
        await this.petitionService.updatePetition(petition, petition._id);
      }
    }

    await this.usersModel.deleteOne({ _id: userId }).exec();
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
