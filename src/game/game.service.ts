import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/users/users.model';

import { Game } from './game.model';
import { Comments } from '../otherSchemas/comments.model';

@Injectable()
export class GameService {
  constructor(@InjectModel('game') private readonly gameModel: Model<Game>) {}

  async createGame(
    comments: [Comments],
    participants: [Users],
    description: string,
    creator: Users,
    name: string,
  ) {
    const newGame = new this.gameModel({
      comments,
      participants,
      description,
      creator,
      name,
    });
    const result = await newGame.save();
    return result.id as string;
  }

  async getGame() {
    const game = await this.gameModel.find().exec();
    return game.map((game) => ({
      id: game.id,
      comments: game.comments,
      participants: game.participants,
      description: game.description,
      creator: game.creator,
      name: game.name,
    }));
  }

  async getSingleGame(gameId: string) {
    const game = await this.findGame(gameId);
    return {
      id: game.id,
      comments: game.comments,
      participants: game.participants,
      description: game.description,
      creator: game.creator,
      name: game.name,
    };
  }

  async updateGame(
    gameId: string,
    comments: [Comments],
    participants: [Users],
    description: string,
    creator: Users,
    name: string,
  ) {
    const updatedGame = await this.findGame(gameId);
    if (comments) {
      updatedGame.comments = comments;
    }
    if (participants) {
      updatedGame.participants = participants;
    }
    if (description) {
      updatedGame.description = description;
    }
    if (creator) {
      updatedGame.creator = creator;
    }
    if (name) {
      updatedGame.name = name;
    }
    updatedGame.save();
  }

  async deleteGame(gameId: string) {
    const result = await this.gameModel.deleteOne({ _id: gameId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(
        'No se ha encontrado la partida que deseaba borrar',
      );
    }
  }

  private async findGame(id: string): Promise<Game> {
    let game;
    try {
      game = await this.gameModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('No se ha encontrado la partida.');
    }
    if (!game) {
      throw new NotFoundException('No se ha encontrado la partida');
    }
    return game;
  }
}
