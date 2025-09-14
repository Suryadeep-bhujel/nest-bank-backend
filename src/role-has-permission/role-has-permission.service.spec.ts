import { Test, TestingModule } from '@nestjs/testing';
import { RoleHasPermissionService } from './role-has-permission.service';

describe('RoleHasPermissionService', () => {
  let service: RoleHasPermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleHasPermissionService],
    }).compile();

    service = module.get<RoleHasPermissionService>(RoleHasPermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
