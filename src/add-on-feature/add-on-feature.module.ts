import { Module } from '@nestjs/common';
import { AddOnFeatureService } from './add-on-feature.service';
import { AddOnFeatureController } from './add-on-feature.controller';

@Module({
  controllers: [AddOnFeatureController],
  providers: [AddOnFeatureService],
})
export class AddOnFeatureModule {}
