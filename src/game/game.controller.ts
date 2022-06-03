import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UpdateGameDTO, CreateGameDTO } from './game.dto';

import { GameService } from './game.service';
import { Query } from '@nestjs/common';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async addGame(@Body() createdGame: CreateGameDTO) {
    const generatedGame = await this.gameService.createGame(createdGame);
    return generatedGame;
  }

  @Get()
  async getAllGames() {
    const game = await this.gameService.getGame();
    return game;
  }

  @Get('/search')
  async findTag(@Query('name') name: string) {
    return await this.gameService.searchGame(name);
  }

  @Get(':id')
  async getGame(@Param('id') gameId: string) {
    return await this.gameService.getSingleGame(gameId);
  }

  @Patch(':id')
  async updateGame(@Param('id') gameId: string, @Body() game: UpdateGameDTO) {
    const updatedGame = await this.gameService.updateGame(gameId, game);
    return updatedGame;
  }

  @Delete(':id')
  async removeGame(@Param('id') gameId: string) {
    await this.gameService.deleteGame(gameId);
    return null;
  }
}
