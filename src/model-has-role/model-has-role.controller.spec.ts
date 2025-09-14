import { Test, TestingModule } from '@nestjs/testing';
import { ModelHasRoleController } from './model-has-role.controller';
import { ModelHasRoleService } from './model-has-role.service';

describe('ModelHasRoleController', () => {
  let controller: ModelHasRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModelHasRoleController],
      providers: [ModelHasRoleService],
    }).compile();

    controller = module.get<ModelHasRoleController>(ModelHasRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
