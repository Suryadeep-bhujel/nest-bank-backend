import { Module } from '@nestjs/common';
import { BranchManagerService } from './branch-manager.service';
import { BranchManagerController } from './branch-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchManager } from './entities/branch-manager.entity';
import { Branch } from 'src/branch/entities/branch.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BranchManager, Branch]),
    // Add any other modules that are needed for this module
  ],
  controllers: [BranchManagerController],
  providers: [BranchManagerService],
})
export class BranchManagerModule {}
