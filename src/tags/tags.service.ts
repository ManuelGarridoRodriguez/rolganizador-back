import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TagsDTO } from './tags.dto';

import { Tags } from './tags.model';

@Injectable()
export class TagsService {
  constructor(@InjectModel('Tags') private readonly tagsModel: Model<Tags>) {}

  async createTag(tag: TagsDTO) {
    const newTag = new this.tagsModel(tag);
    const result = await newTag.save();
    return result;
  }

  async getTags() {
    const tags = await this.tagsModel.find().exec();
    return tags;
  }

  async findTag(name: string): Promise<Tags> {
    let tag;
    try {
      tag = await this.tagsModel.find({ name: name }).exec();
    } catch (error) {
      throw new NotFoundException('No se ha encontrado la etiqueta.');
    }
    if (!tag) {
      throw new NotFoundException('No se ha encontrado la etiqueta');
    }
    return tag;
  }
}
