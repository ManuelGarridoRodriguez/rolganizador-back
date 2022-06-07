import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PetitionsService } from './petitions.service';
import { CreatePetitionDTO } from './petitions.dto.models';

@Controller('petitions')
export class PetitionsController {
  constructor(private readonly petitionsService: PetitionsService) {}

  @Post()
  async addPetition(@Body() createdPetition: CreatePetitionDTO) {
    const generatedPetition = await this.petitionsService.createPetition(
      createdPetition,
    );
    return generatedPetition;
  }

  @Get()
  async getAllPetitions() {
    const petitions = await this.petitionsService.getPetitions();
    return petitions;
  }

  @Get('/user/:id')
  async getPetitionsByUser(@Param('id') userId: string) {
    const petitions = await this.petitionsService.getPetitionsByUser(userId);
    return petitions;
  }

  @Patch(':id')
  async updatePetition(
    @Param('id') petitionId: string,
    @Body() updatedPetition,
  ) {
    const petition = await this.petitionsService.updatePetition(
      updatedPetition,
      petitionId,
    );
    return petition;
  }

  @Delete(':id')
  async removePetition(@Param('id') petitionId: string) {
    await this.petitionsService.deletePetition(petitionId);
    return null;
  }
}
