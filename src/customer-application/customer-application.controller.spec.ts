import { Test, TestingModule } from '@nestjs/testing';
import { CustomerApplicationController } from './customer-application.controller';
import { CustomerApplicationService } from './customer-application.service';

describe('CustomerApplicationController', () => {
  let controller: CustomerApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerApplicationController],
      providers: [CustomerApplicationService],
    }).compile();

    controller = module.get<CustomerApplicationController>(CustomerApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
