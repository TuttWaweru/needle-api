import { Test, TestingModule } from '@nestjs/testing';
import { MediaitemService } from './mediaitem.service';

describe('MediaitemService', () => {
  let service: MediaitemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaitemService],
    }).compile();

    service = module.get<MediaitemService>(MediaitemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
