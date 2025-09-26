import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddOnFeatureService } from './add-on-feature.service';
import { CreateAddOnFeatureDto } from './dto/create-add-on-feature.dto';
import { UpdateAddOnFeatureDto } from './dto/update-add-on-feature.dto';

@Controller('add-on-feature')
export class AddOnFeatureController {
  constructor(private readonly addOnFeatureService: AddOnFeatureService) {}

  @Post()
  create(@Body() createAddOnFeatureDto: CreateAddOnFeatureDto) {
    return this.addOnFeatureService.create(createAddOnFeatureDto);
  }

  @Get()
  findAll() {
    return this.addOnFeatureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addOnFeatureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddOnFeatureDto: UpdateAddOnFeatureDto) {
    return this.addOnFeatureService.update(+id, updateAddOnFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addOnFeatureService.remove(+id);
  }
}
