import { Test, TestingModule } from '@nestjs/testing';
import { MediaitemController } from './mediaitem.controller';

describe('Mediaitem Controller', () => {
  let controller: MediaitemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaitemController],
    }).compile();

    controller = module.get<MediaitemController>(MediaitemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
