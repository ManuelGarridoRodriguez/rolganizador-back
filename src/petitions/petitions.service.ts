import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from 'src/game/game.model';
import { Users } from 'src/users/users.model';

import { Petitions } from './petitions.model';

@Injectable()
export class PetitionsService {
  constructor(
    @InjectModel('petitions') private readonly petitionsModel: Model<Petitions>,
  ) {}

  async createPetition(game: Game, user: Users, status: string, date: Date) {
    const newPetition = new this.petitionsModel({
      game,
      user,
      status,
      date,
    });
    const result = await newPetition.save();
    return result.id as string;
  }

  async getPetitions() {
    const petitions = await this.petitionsModel.find().exec();
    return petitions.map((petition) => ({
      id: petition.id,
      game: petition.game,
      user: petition.user,
      status: petition.status,
      date: petition.date,
    }));
  }

  async getSinglePetition(petitionId: string) {
    const petition = await this.findPetition(petitionId);
    return {
      id: petition.id,
      game: petition.game,
      user: petition.user,
      status: petition.status,
      date: petition.date,
    };
  }

  async updatePetition(
    petitionId: string,
    game: Game,
    user: Users,
    status: string,
    date: Date,
  ) {
    const updatedPetition = await this.findPetition(petitionId);
    if (game) {
      updatedPetition.game = game;
    }
    if (user) {
      updatedPetition.user = user;
    }
    if (status) {
      updatedPetition.status = status;
    }
    if (date) {
      updatedPetition.date = date;
    }
    updatedPetition.save();
  }

  async deletePetition(petitionId: string) {
    const result = await this.petitionsModel
      .deleteOne({ _id: petitionId })
      .exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(
        'No se ha encontrado la petición que deseaba borrar',
      );
    }
  }

  private async findPetition(id: string): Promise<Petitions> {
    let petition;
    try {
      petition = await this.petitionsModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('No se ha encontrado la petición.');
    }
    if (!petition) {
      throw new NotFoundException('No se ha encontrado la petición');
    }
    return petition;
  }
}
