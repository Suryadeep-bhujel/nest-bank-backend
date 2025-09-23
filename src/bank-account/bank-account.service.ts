import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BaseService } from '@src/common/services/base-service';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { AppService } from '@src/app.service';
import { BankAccount, BankAccountCustomers } from '@src/bank-account/entities/bank-account.entity';
import { ListResponseDto } from '@src/common/dto/ListResponseDto';
import { BankAccountSearchDto } from '@src/bank-account/dto/bank-account-search.dto';
import { Customer } from '@src/customer/entities/customer.entity';

@Injectable()
export class BankAccountService extends BaseService {

    constructor(
        @InjectRepository(BankAccount)
        private readonly bankAccountRepository: Repository<BankAccount>,
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,

        @InjectRepository(BankAccountCustomers)
        private readonly bankAccountCustomersRepository: Repository<BankAccountCustomers>,
        private readonly appService: AppService
    ) {
        super();
    }
    async accountNumberGenerator(): Promise<string> {
        const lastAccount = await this.bankAccountRepository.find({
            order: {
                id: 'DESC'
            },
            take: 1
        });
        if (lastAccount && lastAccount.length > 0) {
            const lastAccountNumber = lastAccount[0].accountNumber;
            const numericPart = parseInt(lastAccountNumber.replace(/\D/g, ''), 10); // Extract numeric part and convert to integer
            const newNumericPart = numericPart + 1; // Increment the numeric part
            const newAccountNumber = `BA${newNumericPart.toString().padStart(6, '0')}`; // Format with leading zeros
            return newAccountNumber;
        }
        return 'BA000001'; // Starting account number if no accounts exist
    }
    async create(createBankAccountDto: CreateBankAccountDto) {
        try {
            const { status, balance, accountType, currency, customerOids } = createBankAccountDto

            const accountNumber = await this.accountNumberGenerator();

            const duplicateAccount = await this.bankAccountRepository.findOne({ where: { accountNumber } });
            if (duplicateAccount) {
                throw new BadRequestException(`Account with this account number : ${accountNumber} already exists`);
            }
            let customers = await this.customerRepository.find({
                where: customerOids ? customerOids.map(oid => ({ _oid: oid })) : []
            });
            if (customerOids && customerOids.length > 0 && customers.length !== customerOids.length) {
                throw new NotFoundException(`One or more customers not found for the provided IDs`);
            }
            console.log("customerscustomers", customers)
            const data = {
                _oid: this.appService.generateOid(),
                accountNumber: accountNumber,
                status,
                balance,
                accountType,
                currency
            }
            const bankAccount = this.bankAccountRepository.create(data);
            const account = await this.bankAccountRepository.save(bankAccount);
            console.log("Created bank account: ", account);
            if (customers && customers.length > 0) {
                const bankAccountCustomers = customers.map(customer => {
                    return this.bankAccountCustomersRepository.create({
                        _oid: this.appService.generateOid(),
                        bankAccountId: account.id,
                        customerId: customer.id
                    });
                });
                await this.bankAccountCustomersRepository.save(bankAccountCustomers);
            }
            return {
                message: 'Bank account created successfully',
                data: account,
            };
        } catch (error) {
            throw error;
        }
    }

    private async bankAccountList(search: BankAccountSearchDto) {
        this.setSearchProperties(search);
        console.log("search ", this.limit, this.offset)
        let query = this.bankAccountRepository
            .createQueryBuilder('bank_accounts')
            .leftJoinAndSelect('bank_accounts.customers', 'customers')
            .leftJoinAndSelect('customers.customer', 'customer')
            // .addSelect('addedBy.id', 'addedBy.name') // ✅ only selected fields from addedBy
            .select([
                // "bankAccount.*",
                'bank_accounts.id',
                'bank_accounts.accountNumber',
                'bank_accounts.status',
                'bank_accounts.balance',
                'bank_accounts.accountType',
                'bank_accounts.currency',
                'bank_accounts._oid',
                'customers.bankAccountId',
                'customers.customerId',
                'customers._oid',
                'customer.id',
                'customer.firstName',
                'customer.lastName',
                'customer.middleName',
                'customer.email',
                'customer.phoneNumber',
                'customer._oid'
            ]);
        if (this.searchFieldName) {
            const search = `%${this.searchFieldValue}%`;
            if (this.searchFieldName === 'status') {
                // exact match for enum
                query = query.andWhere(`bank_accounts.${this.searchFieldName} = :status`, {
                    status: this.searchFieldValue,
                });
            } else {
                query = query.where({
                    [this.searchFieldName]: this.searchFieldValue ? ILike(`%${this.searchFieldValue}%`) : undefined,
                })
            }

        }
        if (this.sortBy && this.sortOrder) {
            query = query.orderBy('bank_accounts.' + this.sortBy, this.sortOrder);
        }

        return await query.skip(this.offset)
            .take(this.limit)
            .getManyAndCount();
    }

    async findAll(search: BankAccountSearchDto) {
        try {
            const [bankAccounts, count] = await this.bankAccountList(search);
            return {
                message: 'Bank accounts retrieved successfully',
                data: new ListResponseDto(bankAccounts, count, this.limit, this.page),
            }
        } catch (error) {
            // this.appService.handleError(error);
            throw error;
        }
    }

    async findOne(_oid: string) {
        try {
            const bankAccount = await this.bankAccountRepository.findOne({ where: { _oid } });
            if (!bankAccount) {
                throw new NotFoundException(`Bank account with id ${_oid} not found`);
            }
            return {
                message: 'Bank account retrieved successfully',
                data: bankAccount,
            };
        } catch (error) {
            // this.appService.handleError(error);
            throw error;
        }
    }

    async update(_oid: string, updateBankAccountDto: UpdateBankAccountDto) {
        try {
            const bankAccount = await this.bankAccountRepository.findOne({ where: { _oid } });
            if (!bankAccount) {
                throw new NotFoundException(`Bank account with id ${_oid} not found`);
            }
            const updatedBankAccount = this.bankAccountRepository.merge(bankAccount, updateBankAccountDto);
            await this.bankAccountRepository.save(updatedBankAccount);
            return {
                message: 'Bank account updated successfully',
                data: updatedBankAccount,
            };
        } catch (error) {
            throw error;
        }
    }

    async remove(_oid: string) {
        try {
            const bankAccount = await this.bankAccountRepository.findOne({ where: { _oid } });
            if (!bankAccount) {
                throw new NotFoundException(`Bank account with id ${_oid} not found`);
            }
            await this.bankAccountRepository.remove(bankAccount);
            return {
                message: 'Bank account removed successfully',
            };
        } catch (error) {
            // this.appService.handleError(error);
            throw error;
        }
    }
}
