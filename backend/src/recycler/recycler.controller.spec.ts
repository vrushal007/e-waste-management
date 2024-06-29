import { Test, TestingModule } from '@nestjs/testing';
import { RecyclerController } from './recycler.controller';
import { RecyclerService } from './recycler.service';

describe('RecyclerController', () => {
  let controller: RecyclerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecyclerController],
      providers: [RecyclerService],
    }).compile();

    controller = module.get<RecyclerController>(RecyclerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
