import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { TagsSchema } from './tags.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tags', schema: TagsSchema }])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
