import { Test, TestingModule } from '@nestjs/testing';
import { CustomerBankAccountService } from './customer-bank-account.service';

describe('CustomerBankAccountService', () => {
  let service: CustomerBankAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerBankAccountService],
    }).compile();

    service = module.get<CustomerBankAccountService>(CustomerBankAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
