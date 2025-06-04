import { Test, TestingModule } from '@nestjs/testing';
import { TaleImagesController } from './tale-images.controller';
import { TaleImagesService } from './tale-images.service';

describe('TaleImagesController', () => {
  let controller: TaleImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaleImagesController],
      providers: [TaleImagesService],
    }).compile();

    controller = module.get<TaleImagesController>(TaleImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
