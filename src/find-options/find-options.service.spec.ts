import { Test, TestingModule } from '@nestjs/testing';
import { FindOptionsService } from './find-options.service';

describe('FindOptionsService', () => {
  let service: FindOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindOptionsService],
    }).compile();

    service = module.get<FindOptionsService>(FindOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
