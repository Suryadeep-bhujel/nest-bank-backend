import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, CreateCustomerResponseDto } from '@src/customer/dto/create-customer.dto';
import { UpdateCustomerDto } from '@src/customer/dto/update-customer.dto';
import { CustomerAddressesService } from '@src/customer-addresses/customer-addresses.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '@src/customer/entities/customer.entity';
import { ILike, Repository } from 'typeorm';
import { AppService } from '@src/app.service';
import { DateService } from '@src/date.service';
import { User } from '@src/users/entities/user.entity';
import { ListResponseDto } from '@src/common/dto/ListResponseDto';
import { CustomerSearchDto } from '@src/customer/dto/customer-search.dto';
import { BaseService } from '@src/common/services/base-service';

@Injectable()
export class CustomerService extends BaseService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        private readonly appService: AppService,
        private readonly dateService: DateService
    ) {
        super();
    }
    async create(createCustomerDto: CreateCustomerDto, user?: User): Promise<CreateCustomerResponseDto> {
        createCustomerDto._oid = this.appService.generateOid();
        createCustomerDto.dateOfBirth = this.dateService.convertToDate(createCustomerDto.dateOfBirth, "DD-MM-YYYY");
        createCustomerDto.addedByStaffId = user?.id
        // const customer = await this.customerRepository.create(createCustomerDto);
        const savedCustomer = await this.customerRepository.save(createCustomerDto);
        return {
            message: 'Customer created successfully',
            data: savedCustomer,
        } as CreateCustomerResponseDto
    }
    private async customersList(search: CustomerSearchDto) {
        this.setSearchProperties(search);
        console.log("search ", this.limit, this.offset)
        let query = this.customerRepository
            .createQueryBuilder('customers')
            .leftJoinAndSelect('customers.addedBy', 'addedBy')
            // .addSelect('addedBy.id', 'addedBy.name') // ✅ only selected fields from addedBy
            .select([
                "customers",
                // 'customers.id',
                // 'customers.firstName',
                // 'customers.lastName',
                // 'customers.middleName',
                // 'customers.email',
                // 'customers.phoneNumber',
                // 'customers._oid',
                'customers.dateOfBirth',
                'addedBy.id',
                'addedBy.name',
                'addedBy._oid',
                'addedBy.email'
            ]);
        if (this.searchFieldName) {
            query = query.where({
                [this.searchFieldName]: this.searchFieldValue ? ILike(`%${this.searchFieldValue}%`) : undefined,
            })

        }
        if (this.sortBy && this.sortOrder) {
            query = query.orderBy('customers.' + this.sortBy, this.sortOrder);
        }

        return await query.skip(this.offset).take(this.limit).getManyAndCount();
    }
    async findAll(user: User, search: CustomerSearchDto) {
        try {
            const [customers, count] = await this.customersList(search);
            console.log("customers", customers);
            return {
                message: 'Customers retrieved successfully',
                data: new ListResponseDto(customers, count, this.limit, this.page),
            }
        } catch (error) {
            console.error('Error finding all customers:', error);
            throw new Error('Customer retrieval failed'); // Handle error appropriately
        }
    }

    findOne(_oid: string) {
        try {
            const customer = this.customerRepository.findOne({ where: { _oid: _oid } })
            if (!customer) {
                throw new NotFoundException(`Customer with ID ${_oid} not found`);
            }
            return {
                message: 'Customer retrieved successfully',
                data: customer,
            };
        } catch (error) {
            console.error('Error finding customer:', error);
            throw new Error('Customer retrieval failed'); // Handle error appropriately
        }
    }

    async update(_oid: string, updateCustomerDto: UpdateCustomerDto) {
        try {
            console.log("updateCustomerDto", updateCustomerDto)
            if (updateCustomerDto.dateOfBirth) {
                updateCustomerDto.dateOfBirth = this.dateService.convertToDate(updateCustomerDto.dateOfBirth, "DD-MM-YYYY");
            }
            let customer = await this.customerRepository.findOne({ where: { _oid: _oid } })
            if (!customer) {
                throw new NotFoundException(`Customer with ID ${_oid} not found`);
            }
            Object.assign(customer, updateCustomerDto);
            await this.customerRepository.save(customer);
            return {
                message: 'Customer updated successfully',
                data: customer,
            };
        } catch (error) {
            console.error('Error updating customer:', error);
            throw new Error('Customer update failed'); // Handle error appropriately
        }
    }

    async remove(_oid: string) {
        try {
            const customer = await this.customerRepository.findOne({ where: { _oid: _oid } })
            if (!customer) {
                throw new NotFoundException(`Customer with ID ${_oid} not found`);
            }
            await this.customerRepository.delete({ _oid });
            return {
                message: 'Customer removed successfully',
            };
        } catch (error) {
            console.error('Error removing customer:', error);
            throw new Error('Customer removal failed'); // Handle error appropriately
        }
    }
}
