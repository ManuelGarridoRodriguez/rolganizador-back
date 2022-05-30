import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async addUser(@Body('name') tagName: string) {
    const generateId = await this.tagsService.createTag(tagName);
    return { id: generateId, name: tagName };
  }

  @Get()
  async getAlltags() {
    const tags = await this.tagsService.getTags();
    return tags;
  }

  @Get(':id')
  async getTag(@Param('id') tagId: string) {
    return await this.tagsService.getSingleTag(tagId);
  }

  @Patch(':id')
  async updatetag(@Param('id') tagId: string, @Body('name') tagName: string) {
    await this.tagsService.updateTag(tagId, tagName);
    return null;
  }

  @Delete(':id')
  async removetag(@Param('id') tagId: string) {
    await this.tagsService.deleteTag(tagId);
    return null;
  }
}
