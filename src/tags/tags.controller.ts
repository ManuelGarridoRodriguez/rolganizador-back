import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { TagsDTO } from './tags.dto';

import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async addTag(@Body() tag: TagsDTO) {
    const generatedTag = await this.tagsService.createTag(tag);
    return generatedTag;
  }

  @Get()
  async getAlltags() {
    const tags = await this.tagsService.getTags();
    return tags;
  }

  @Get()
  async findTag(@Query('name') name: string) {
    return await this.tagsService.findTag(name);
  }
}
