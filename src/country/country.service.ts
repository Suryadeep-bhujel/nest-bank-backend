import { Injectable } from '@nestjs/common';
import { CreateCountryDto, CreateUpdateResponseDto } from '@src/country/dto/create-country.dto';
import { UpdateCountryDto } from '@src/country/dto/update-country.dto';
import { BaseService } from '@src/common/services/base-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from '@src/country/entities/country.entity';
import { ILike, Repository } from 'typeorm';
import { CountrySearchDto } from './dto/country-search.dto';
import { User } from 'src/users/entities/user.entity';
import { CommonListReponse, ListResponseDto } from 'src/common/dto/ListResponseDto';

@Injectable()
export class CountryService extends BaseService {
    constructor(
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
    ) {
        super();
    }
    async create(createCountryDto: CreateCountryDto): Promise<CreateUpdateResponseDto> {
        try {
            const { _oid, countryName, countryCode, status, sanctionStatus, dialCode } = createCountryDto;
            let existingCountry;
            if (_oid) {
                existingCountry = await this.countryRepository.findOne({ where: { _oid } });
                if (!existingCountry) {
                    throw new Error('Country with the same name already exists');
                }
            }
            const duplicateRecord = await this.countryRepository.find({
                where: [
                    { countryName },
                    { countryCode },
                ]
            })
            const countryData = {
                countryName,
                countryCode,
                status,
                sanctionStatus,
                dialCode
            }
            if (existingCountry) {
                if (duplicateRecord && duplicateRecord.length > 0 && !(duplicateRecord.length === 1 && duplicateRecord[0]._oid === _oid)) {
                    return {
                        message: 'Country with the same name or code or call code already exists',
                        data: null,
                        success: false,
                    }
                }
                const country = await this.countryRepository.update({ _oid }, countryData);
                Object.assign(countryData, { ...country })
            } else {
                if (duplicateRecord && duplicateRecord.length > 0) {
                    return {
                        message: 'Country with the same name or code or call code already exists',
                        data: null,
                        success: false,
                    }
                }
                const country = await this.countryRepository.save({ ...countryData, _oid: this.generateOid() } as Country);
                Object.assign(countryData, { ...country })
            }
            return {
                message: existingCountry ? 'Country updated successfully' : 'Country created successfully',
                data: countryData,
                success: true,
            };
        } catch (error) {
            console.error("Error creating country:", error);
            return {
                message: error.message,
                data: null,
                success: false,
            };
        }
    }
    private async countryList(search: CountrySearchDto) {
        this.setSearchProperties(search);
        return await this.countryRepository.findAndCount({
            where: {
                [this.searchFieldName]: this.searchFieldValue ? ILike(`%${this.searchFieldValue}%`) : undefined,
            },
            order: {
                id: 'DESC',
            },
            skip: this.offset,
            take: this.limit,
        });
    }

    async findAll(search: CountrySearchDto, user: User): Promise<CommonListReponse> {
        try {
            const [data, total] = await this.countryList(search);
            return {
                message: 'Countries fetched successfully',
                data: new ListResponseDto(data, total, this.limit, this.page),
            }
        } catch (error) {
            console.error('Error fetching countries:', error);
            throw new Error('Country fetching failed'); // Handle error appropriately    
        }
    }
    async getCountryDropdown(search: CountrySearchDto, user: User): Promise<CommonListReponse> {
        try {
            this.setSearchProperties(search);
            const [data, total] = await this.countryRepository.findAndCount({
                select: ['countryName', 'countryCode', 'dialCode'],
                where: {
                    [this.searchFieldName]: this.searchFieldValue ? ILike(`%${this.searchFieldValue}%`) : undefined,
                },
                order: {
                    id: 'DESC',
                },
                skip: this.offset,
                take: this.limit,
            });

            return {
                message: 'Country dropdown fetched successfully',
                data: new ListResponseDto(data, total, this.limit, this.page),
            }
        } catch (error) {
            console.error('Error fetching country dropdown:', error);
            throw new Error('Country dropdown fetching failed'); // Handle error appropriately    
        }
    }

    async findOne(_oid: string): Promise<CreateUpdateResponseDto> {
        try {
            const country = await this.countryRepository.findOne({ where: { _oid } });
            if (!country) {
                return {
                    message: 'Country not found',
                    data: null,
                    success: false,
                }
            }
            return {
                message: 'Country fetched successfully',
                data: country,
                success: true,
            } as CreateUpdateResponseDto
        } catch (error) {
            console.error('Error fetching country:', error);
            return {
                message: error.message,
                data: null,
                success: false,
            } as CreateUpdateResponseDto
        }
    }

    async update(_oid: string, updateCountryDto: UpdateCountryDto): Promise<CreateUpdateResponseDto> {
        try {
            const existingCountry = await this.countryRepository.findOne({ where: { _oid } });
            if (!existingCountry) {
                return {
                    message: 'Country not found',
                    data: null,
                    success: false,
                }
            }
            const { countryName, countryCode, dialCode } = updateCountryDto;
            const duplicateRecord = await this.countryRepository.find({
                where: [
                    { countryName },
                    { countryCode },
                ]
            })
            if (duplicateRecord && duplicateRecord.length > 0 && !(duplicateRecord.length === 1 && duplicateRecord[0]._oid === _oid)) {
                return {
                    message: 'Country with the same name or code or call code already exists',
                    data: null,
                    success: false,
                }
            }
            const updatedCountry = await this.countryRepository.update({ _oid }, updateCountryDto);
            return {
                message: 'Country updated successfully',
                data: updateCountryDto,
                success: true,
            } as CreateUpdateResponseDto

        } catch (error) {
            console.error('Error updating country:', error);
            return {
                message: error.message,
                data: null,
                success: false,
            } as CreateUpdateResponseDto
        }
    }
}
