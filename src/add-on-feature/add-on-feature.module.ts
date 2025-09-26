import { Module } from '@nestjs/common';
import { AddOnFeatureService } from '@src/add-on-feature/add-on-feature.service';
import { AddOnFeatureController } from '@src/add-on-feature/add-on-feature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '@src/customer/entities/customer.entity';
import { BankAccount } from '@src/bank-account/entities/bank-account.entity';
import { User } from '@src/users/entities/user.entity';
import { AddOnFeature } from '@src/add-on-feature/entities/add-on-feature.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Customer, BankAccount, User, AddOnFeature ]),
    ],
  controllers: [AddOnFeatureController],
  providers: [AddOnFeatureService],
})
export class AddOnFeatureModule {}
