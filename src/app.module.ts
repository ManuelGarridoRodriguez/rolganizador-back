import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { GameModule } from './game/game.module';
import { PetitionsModule } from './petitions/petitions.module';

@Module({
  imports: [
    UsersModule,
    TagsModule,
    GameModule,
    PetitionsModule,
    MongooseModule.forRoot(
      'mongodb+srv://Cecrom:_R0ck!Rul3S_@cluster0.v69o7.mongodb.net/rolganizador?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
