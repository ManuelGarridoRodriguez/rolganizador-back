import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersSchema } from './users.model';
import { GameModule } from '../game/game.module';
import { PetitionsModule } from 'src/petitions/petitions.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
    GameModule,
    PetitionsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
