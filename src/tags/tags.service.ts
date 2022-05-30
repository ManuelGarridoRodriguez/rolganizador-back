import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Tags } from './tags.model';

@Injectable()
export class TagsService {
  constructor(@InjectModel('Tags') private readonly tagsModel: Model<Tags>) {}

  async createTag(name: string) {
    const newTag = new this.tagsModel({
      name,
    });
    const result = await newTag.save();
    return result.id as string;
  }

  async getTags() {
    const tags = await this.tagsModel.find().exec();
    return tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
    }));
  }

  async getSingleTag(tagId: string) {
    const tag = await this.findTag(tagId);
    return {
      id: tag.id,
      name: tag.name,
    };
  }

  async updateTag(tagId: string, name: string) {
    const updatedTag = await this.findTag(tagId);

    updatedTag.name = name;
    updatedTag.save();
  }

  async deleteTag(tagId: string) {
    const result = await this.tagsModel.deleteOne({ id: tagId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(
        'No se ha encontrado la etiqueta que deseaba borrar',
      );
    }
  }

  private async findTag(id: string): Promise<Tags> {
    let tag;
    try {
      tag = await this.tagsModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('No se ha encontrado la etiqueta.');
    }
    if (!tag) {
      throw new NotFoundException('No se ha encontrado la etiqueta');
    }
    return tag;
  }
}
