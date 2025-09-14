import { Test, TestingModule } from '@nestjs/testing';
import { CustomerApplicationService } from './customer-application.service';

describe('CustomerApplicationService', () => {
  let service: CustomerApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerApplicationService],
    }).compile();

    service = module.get<CustomerApplicationService>(CustomerApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
