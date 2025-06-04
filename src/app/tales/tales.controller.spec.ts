import { Test, TestingModule } from '@nestjs/testing';
import { TalesController } from './tales.controller';
import { TalesService } from './tales.service';

describe('TalesController', () => {
  let controller: TalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalesController],
      providers: [TalesService],
    }).compile();

    controller = module.get<TalesController>(TalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
