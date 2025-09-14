import { Test, TestingModule } from '@nestjs/testing';
import { CustomerBankAccountController } from './customer-bank-account.controller';
import { CustomerBankAccountService } from './customer-bank-account.service';

describe('CustomerBankAccountController', () => {
  let controller: CustomerBankAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerBankAccountController],
      providers: [CustomerBankAccountService],
    }).compile();

    controller = module.get<CustomerBankAccountController>(CustomerBankAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
