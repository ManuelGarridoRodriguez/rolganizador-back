import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Game } from 'src/game/game.model';
import { Users } from 'src/users/users.model';

import { PetitionsService } from './petitions.service';

@Controller('petitions')
export class PetitionsController {
  constructor(private readonly petitionsService: PetitionsService) {}

  @Post()
  async addPetition(
    @Body('game') petitionGame: Game,
    @Body('user') petitionUser: Users,
    @Body('status') petitionStatus: string,
    @Body('date') petitionDate: Date,
  ) {
    const generateId = await this.petitionsService.createPetition(
      petitionGame,
      petitionUser,
      petitionStatus,
      petitionDate,
    );
    return { id: generateId };
  }

  @Get()
  async getAllPetitions() {
    const petitions = await this.petitionsService.getPetitions();
    return petitions;
  }

  @Get(':id')
  async getPetition(@Param('id') petitionId: string) {
    return await this.petitionsService.getSinglePetition(petitionId);
  }

  @Patch(':id')
  async updatePetition(
    @Param('id') petitionId: string,
    @Body('game') petitionGame: Game,
    @Body('user') petitionUser: Users,
    @Body('status') petitionStatus: string,
    @Body('date') petitionDate: Date,
  ) {
    await this.petitionsService.updatePetition(
      petitionId,
      petitionGame,
      petitionUser,
      petitionStatus,
      petitionDate,
    );
    return null;
  }

  @Delete(':id')
  async removePetition(@Param('id') petitionId: string) {
    await this.petitionsService.deletePetition(petitionId);
    return null;
  }
}
