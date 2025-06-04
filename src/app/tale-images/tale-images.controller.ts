import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaleImagesService } from './tale-images.service';
import { CreateTaleImageDto } from './dto/create-tale-image.dto';
import { UpdateTaleImageDto } from './dto/update-tale-image.dto';

@Controller('tale-images')
export class TaleImagesController {
  constructor(private readonly taleImagesService: TaleImagesService) {}

  @Post()
  create(@Body() createTaleImageDto: CreateTaleImageDto) {
    return this.taleImagesService.create(createTaleImageDto);
  }

  @Get()
  findAll() {
    return this.taleImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taleImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaleImageDto: UpdateTaleImageDto) {
    return this.taleImagesService.update(+id, updateTaleImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taleImagesService.remove(+id);
  }
}
