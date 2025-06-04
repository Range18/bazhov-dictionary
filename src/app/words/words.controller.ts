import { Controller, Get, Param, Query } from '@nestjs/common';
import { WordsService } from './words.service';
import { ApiTags } from '@nestjs/swagger';
import { WordQueryDto } from './dto/word-query.dto';

@ApiTags('Words')
@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  async findAll(@Query() query: WordQueryDto) {
    return this.wordsService.formatToRdo(
      await this.wordsService.findAll(query),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.wordsService.formatToRdo(await this.wordsService.findOne(id));
  }
}
