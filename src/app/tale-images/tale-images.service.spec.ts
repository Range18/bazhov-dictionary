import { Test, TestingModule } from '@nestjs/testing';
import { TaleImagesService } from './tale-images.service';

describe('TaleImagesService', () => {
  let service: TaleImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaleImagesService],
    }).compile();

    service = module.get<TaleImagesService>(TaleImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
