import { Test, TestingModule } from '@nestjs/testing';
import { ModelHasRoleService } from './model-has-role.service';

describe('ModelHasRoleService', () => {
  let service: ModelHasRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelHasRoleService],
    }).compile();

    service = module.get<ModelHasRoleService>(ModelHasRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
