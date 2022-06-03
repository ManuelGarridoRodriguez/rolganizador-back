import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from './game.model';
import { UpdateGameDTO, CreateGameDTO } from './game.dto';

@Injectable()
export class GameService {
  constructor(@InjectModel('Game') private readonly gameModel: Model<Game>) {}

  async createGame(game: CreateGameDTO) {
    const newGame = new this.gameModel({
      comments: [],
      participants: [],
      description: game.description,
      creator: game.creator,
      name: game.name,
      tags: game.tags,
    });
    const result = await newGame.save();
    await result.populate('creator tags');
    return result;
  }

  async getGame() {
    const games: Array<Game> = await this.gameModel
      .find()
      .populate('participants creator tags')
      .exec();

    return games;
  }

  async getSingleGame(gameId: string) {
    const game = await this.findGame(gameId);

    await game.populate('participants tags creator');

    return game;
  }

  async updateGame(gameId: string, game: UpdateGameDTO) {
    const updatedGame = await this.findGame(gameId);
    if (game.comments) {
      updatedGame.comments = game.comments;
    }
    if (game.participants) {
      updatedGame.participants = game.participants;
    }
    if (game.description) {
      updatedGame.description = game.description;
    }
    if (game.name) {
      updatedGame.name = game.name;
    }
    updatedGame.save();

    await updatedGame.populate('participants creator tags');

    return updatedGame;
  }

  async deleteGame(gameId: string) {
    const result = await this.gameModel.deleteOne({ id: gameId }).exec();
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
    await game.populate('participants creator tags');
    return game;
  }

  async searchGame(search: string) {
    const games = this.gameModel.find({
      name: { $regex: search, $options: 'i' },
    });
    return games;
  }
}
