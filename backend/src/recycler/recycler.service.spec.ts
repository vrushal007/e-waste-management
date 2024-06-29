import { Test, TestingModule } from '@nestjs/testing';
import { RecyclerService } from './recycler.service';

describe('RecyclerService', () => {
  let service: RecyclerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecyclerService],
    }).compile();

    service = module.get<RecyclerService>(RecyclerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
