import { Module } from '@nestjs/common';
import { CountryService } from '@src/country/country.service';
import { CountryController } from '@src/country/country.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '@src/country/entities/country.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country])  // Add your entities here
  ],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
