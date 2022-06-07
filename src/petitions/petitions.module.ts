import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PetitionsController } from './petitions.controller';
import { PetitionsService } from './petitions.service';
import { PetitionsSchema } from './petitions.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Petitions', schema: PetitionsSchema }]),
  ],
  controllers: [PetitionsController],
  providers: [PetitionsService],
  exports: [PetitionsService],
})
export class PetitionsModule {}
