import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Comments } from 'src/otherSchemas/comments.model';
import { Users } from 'src/users/users.model';

import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async addGame(
    @Body('comments') gameComments: [Comments],
    @Body('participants') gameParticipants: [Users],
    @Body('description') gameDescription: string,
    @Body('creator') gameCreator: Users,
    @Body('name') gameName: string,
  ) {
    const generateId = await this.gameService.createGame(
      gameComments,
      gameParticipants,
      gameDescription,
      gameCreator,
      gameName,
    );
    return { id: generateId };
  }

  @Get()
  async getAllGames() {
    const game = await this.gameService.getGame();
    return game;
  }

  @Get(':id')
  async getGame(@Param('id') gameId: string) {
    return await this.gameService.getSingleGame(gameId);
  }

  @Patch(':id')
  async updateGame(
    @Param('id') gameId: string,
    @Body('comments') gameComments: [Comments],
    @Body('participants') gameParticipants: [Users],
    @Body('description') gameDescription: string,
    @Body('creator') gameCreator: Users,
    @Body('name') gameName: string,
  ) {
    await this.gameService.updateGame(
      gameId,
      gameComments,
      gameParticipants,
      gameDescription,
      gameCreator,
      gameName,
    );
    return null;
  }

  @Delete(':id')
  async removeGame(@Param('id') gameId: string) {
    await this.gameService.deleteGame(gameId);
    return null;
  }
}