import { Test, TestingModule } from '@nestjs/testing';
import { BranchStaffService } from './branch-staff.service';

describe('BranchStaffService', () => {
  let service: BranchStaffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchStaffService],
    }).compile();

    service = module.get<BranchStaffService>(BranchStaffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
