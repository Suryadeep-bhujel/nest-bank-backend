import { Module } from '@nestjs/common';
import { ModelHasRoleService } from './model-has-role.service';
import { ModelHasRoleController } from './model-has-role.controller';

@Module({
  controllers: [ModelHasRoleController],
  providers: [ModelHasRoleService],
})
export class ModelHasRoleModule {}
