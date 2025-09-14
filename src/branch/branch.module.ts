import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { AppService } from '@src/app.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Branch]),
  ],
  controllers: [BranchController],
  providers: [BranchService, AppService],
})
export class BranchModule {}
