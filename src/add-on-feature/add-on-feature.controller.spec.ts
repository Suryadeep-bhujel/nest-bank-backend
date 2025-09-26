import { Test, TestingModule } from '@nestjs/testing';
import { AddOnFeatureController } from './add-on-feature.controller';
import { AddOnFeatureService } from './add-on-feature.service';

describe('AddOnFeatureController', () => {
  let controller: AddOnFeatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddOnFeatureController],
      providers: [AddOnFeatureService],
    }).compile();

    controller = module.get<AddOnFeatureController>(AddOnFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
