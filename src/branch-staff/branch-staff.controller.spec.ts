import { Test, TestingModule } from '@nestjs/testing';
import { BranchStaffController } from './branch-staff.controller';
import { BranchStaffService } from './branch-staff.service';

describe('BranchStaffController', () => {
  let controller: BranchStaffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BranchStaffController],
      providers: [BranchStaffService],
    }).compile();

    controller = module.get<BranchStaffController>(BranchStaffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
