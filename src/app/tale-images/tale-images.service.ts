import { Injectable } from '@nestjs/common';
import { CreateTaleImageDto } from './dto/create-tale-image.dto';
import { UpdateTaleImageDto } from './dto/update-tale-image.dto';

@Injectable()
export class TaleImagesService {
  create(createTaleImageDto: CreateTaleImageDto) {
    return 'This action adds a new taleImage';
  }

  findAll() {
    return `This action returns all taleImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taleImage`;
  }

  update(id: number, updateTaleImageDto: UpdateTaleImageDto) {
    return `This action updates a #${id} taleImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} taleImage`;
  }
}
