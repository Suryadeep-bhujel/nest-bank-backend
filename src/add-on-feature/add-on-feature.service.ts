import { Injectable } from '@nestjs/common';
import { CreateAddOnFeatureDto } from './dto/create-add-on-feature.dto';
import { UpdateAddOnFeatureDto } from './dto/update-add-on-feature.dto';

@Injectable()
export class AddOnFeatureService {
  create(createAddOnFeatureDto: CreateAddOnFeatureDto) {
    return 'This action adds a new addOnFeature';
  }

  findAll() {
    return `This action returns all addOnFeature`;
  }

  findOne(id: number) {
    return `This action returns a #${id} addOnFeature`;
  }

  update(id: number, updateAddOnFeatureDto: UpdateAddOnFeatureDto) {
    return `This action updates a #${id} addOnFeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} addOnFeature`;
  }
}
