import { PartialType } from '@nestjs/swagger';
import { CreateAddOnFeatureDto } from './create-add-on-feature.dto';

export class UpdateAddOnFeatureDto extends PartialType(CreateAddOnFeatureDto) {}
