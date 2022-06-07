import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Petitions } from './petitions.model';
import { CreatePetitionDTO, UpdatePetitionDTO } from './petitions.dto.models';

@Injectable()
export class PetitionsService {
  constructor(
    @InjectModel('Petitions') private readonly petitionsModel: Model<Petitions>,
  ) {}

  async createPetition(petition: CreatePetitionDTO) {
    const newPetition = new this.petitionsModel(petition);
    const result = await newPetition.save();
    await result.populate('game sender receptor');
    return result;
  }

  async getPetitions() {
    const petitions = await this.petitionsModel
      .find()
      .populate('game sender receptor')
      .exec();
    return petitions;
  }

  async getSinglePetition(petitionId: string) {
    const petition = await this.findPetition(petitionId);
    await petition.populate('game sender receptor');
    return petition;
  }

  async getPetitionsByUser(userId: string) {
    const petitions = await this.petitionsModel
      .find({ $or: [{ sender: userId }, { receptor: userId }] })
      .populate('game sender receptor')
      .exec();
    return petitions;
  }

  async updatePetition(petition: UpdatePetitionDTO, petitionId: string) {
    const updatedPetition = await this.findPetition(petitionId);
    if (petition.status) {
      updatedPetition.status = petition.status;
    }
    const saved = await updatedPetition.save();
    await saved.populate('game sender receptor');
    return saved;
  }

  async deletePetition(petitionId: string) {
    const result = await this.petitionsModel
      .deleteOne({ id: petitionId })
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
    await petition.populate('game sender receptor');
    return petition;
  }
}
