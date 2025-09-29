import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CountryService } from '@src/country/country.service';
import { CreateCountryDto, CreateUpdateResponseDto } from '@src/country/dto/create-country.dto';
import { UpdateCountryDto } from '@src/country/dto/update-country.dto';
import { JwtAuthGuard } from '@src/auth/jwt-auth.guard';
import { CountrySearchDto } from '@src/country/dto/country-search.dto';
import { AuthUser } from '@src/users/decorators/user.decorator';
import { User } from '@src/users/entities/user.entity';
import { CommonListReponse } from '@src/common/dto/ListResponseDto';

@UseGuards(JwtAuthGuard)
@ApiTags("Country Management")
@Controller('country')
export class CountryController {
    constructor(private readonly countryService: CountryService) { }

    @Post("/add-country")

    @ApiOkResponse({ type: CreateUpdateResponseDto })
    async create(@Body() createCountryDto: CreateCountryDto) {
        return await this.countryService.create(createCountryDto);
    }

    @Get("/list")
    @ApiBody({ type: CountrySearchDto })
    @ApiOkResponse({ type: CommonListReponse })
    async findAll(@Body() search: CountrySearchDto, @AuthUser() user: User) {
        return await this.countryService.findAll(search, user);
    }
    @Get("/country-dropdown")
    @ApiBody({ type: CountrySearchDto })
    @ApiOkResponse({ type: CommonListReponse })
    async getCountryDropdown(@Body() search: CountrySearchDto, @AuthUser() user: User) {
        return await this.countryService.getCountryDropdown(search, user);
    }

    @Get('detail/:_oid')
    async findOne(@Param('_oid') _oid: string) {
        return await this.countryService.findOne(_oid);
    }

    @Patch('update/:_oid')
    async update(@Param('_oid') _oid: string, @Body() updateCountryDto: UpdateCountryDto) {
        return await this.countryService.update(_oid, updateCountryDto);
    }

}