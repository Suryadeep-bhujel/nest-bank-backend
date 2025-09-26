import { Test, TestingModule } from '@nestjs/testing';
import { AddOnFeatureService } from './add-on-feature.service';

describe('AddOnFeatureService', () => {
  let service: AddOnFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddOnFeatureService],
    }).compile();

    service = module.get<AddOnFeatureService>(AddOnFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
