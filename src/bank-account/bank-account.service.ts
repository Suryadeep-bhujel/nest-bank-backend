import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AddressInfoRequestDto, CreateBankAccountDto, CreateBankAccountRequestDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BaseService } from '@src/common/services/base-service';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { AppService } from '@src/app.service';
import { BankAccount, BankAccountCustomers } from '@src/bank-account/entities/bank-account.entity';
import { ListResponseDto } from '@src/common/dto/ListResponseDto';
import { BankAccountSearchDto } from '@src/bank-account/dto/bank-account-search.dto';
import { Customer } from '@src/customer/entities/customer.entity';
import FormValidator from '@bank-app-common/service/form-validator-service';
import { AccountType, AddressStatus, AddressType, ChooseOptions, DocumentType, EducationalQualification, GenderType, MaritalStatus, Occupation, PersonCaste, PersonTitle, SharedStatus } from '@bank-app-common/enum/SharedEnum';
import { Branch } from 'src/branch/entities/branch.entity';
import { DateAndTimeService, DateFormatType } from '@bank-app-common/service/date-service';
import { User } from 'src/users/entities/user.entity';
import { CustomerAddress } from 'src/customer-addresses/entities/customer-address.entity';
import { AddOnFeature } from 'src/add-on-feature/entities/add-on-feature.entity';

@Injectable()
export class BankAccountService extends BaseService {

    constructor(
        @InjectRepository(BankAccount)
        private readonly bankAccountRepository: Repository<BankAccount>,
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,

        @InjectRepository(BankAccountCustomers)
        private readonly bankAccountCustomersRepository: Repository<BankAccountCustomers>,
        @InjectRepository(Branch)
        private readonly branchRepostory: Repository<Branch>,
        @InjectRepository(CustomerAddress)
        private readonly customerAddressRepository: Repository<CustomerAddress>,

        @InjectRepository(AddOnFeature)
        private readonly addonFeatureRepostory: Repository<AddOnFeature>,
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
    async create(createBankAccountDto: CreateBankAccountRequestDto, user: User): Promise<{ message: string, errors: any[], data?: any }> {
        try {
            // console.log("CreateBankAccountRequestDtoCreateBankAccountRequestDtoCreateBankAccountRequestDto", createBankAccountDto)
            const validatonErrors: any[][] = [];
            const {
                accountInfo,
                personalInfo,
                permanentAddressInfo,
                residentialAddressInfo,
                correspondingAddressInfo,
                contactInfo,
                kycInfo,
                addOnInfo
            } = createBankAccountDto

            const branches = await this.branchRepostory.find({
                where: {
                    branchCode: accountInfo.branchCode
                }
            })
            const accountInfoValidation = new FormValidator({
                data: accountInfo,
                rules: {
                    branchCode: "required|string|exists:branches,branchCode",
                    accountType: "required|string|exists:accountTypes",
                    status: "required|string|exists:sharedStatus",
                },
                messages: {},
                dbData: {
                    accountTypes: Object.values(AccountType),
                    sharedStatus: Object.values(SharedStatus),
                    branches: branches,
                },
                rowNo: 1
            }).getErrorItemBag()

            // console.log("validatevalidate", accountInfoValidation.getErrorItemBags())

            const personalInfoValidation = new FormValidator({
                data: personalInfo,
                rules: {
                    title: "nullable|string|exists:personTitle",
                    firstName: "required|string|maxLength:50",
                    middleName: "nullable|string|maxLength:50",
                    lastName: "required|string|maxLength:50",
                    guardianName: "nullable|string|maxLength:150",
                    gender: "required|string|exists:genderType",
                    dateOfBirth: "nullable|is_date|before:today",
                    maritalStatus: "nullable|string|exists:maritalStatus",
                    category: "nullable|string|exists:castes",
                    occupation: "nullable|string|exists:occupations",
                    education: "nullable|string|exists:educations",
                    nationality: "nullable|string",
                    countryOfBirth: "nullable|string",
                    countryOfResidence: "nullable|string",
                },
                messages: {},
                dbData: {
                    personTitle: Object.values(PersonTitle),
                    genderType: Object.values(GenderType),
                    maritalStatus: Object.values(MaritalStatus),
                    castes: Object.values(PersonCaste),
                    occupations: Object.values(Occupation),
                    educations: Object.values(EducationalQualification),
                },
                rowNo: 1
            }).getErrorItemBag()
            const addressValidationRule = {
                addressLine1: "required|string|maxLength:150",
                addressLine2: "nullable|string|maxLength:100",
                houseNo: "required|string|maxLength:30",
                houseName: "required|string|maxLength:100",
                streetNo: "required|string|maxLength:100",
                streetName: "required|string|maxLength:100",
                landmark: "required|string|maxLength:250",
                city: "required|string|maxLength:100",
                district: "required|string|maxLength:100",
                state: "required|string|maxLength:100",
                pincode: "required|string|maxLength:20",
                country: "required|string|maxLength:100"
            }
            // console.log("personalInfoValidation", personalInfoValidation.getErrorItemBags())
            const permanentAddressValidation = new FormValidator({
                data: permanentAddressInfo,
                rules: addressValidationRule,
                messages: {},
                dbData: {},
                rowNo: 1
            }).getErrorItemBag()
            // console.log("permanentAddressValidation", permanentAddressValidation.getErrorItemBags())

            const residentialAddressValidation = new FormValidator({
                data: residentialAddressInfo,
                rules: addressValidationRule,
                messages: {},
                dbData: {},
                rowNo: 1,
                fieldPrefix: "residentialAddressInfo",
            }).getErrorItemBag()
            // console.log("residentialAddressValidation", residentialAddressValidation.getErrorItemBags())

            const correspondingAddressValidation = new FormValidator({
                data: correspondingAddressInfo,
                rules: addressValidationRule,
                messages: {},
                dbData: {},
                rowNo: 1
            }).getErrorItemBag()
            // console.log("correspondingAddressValidation", correspondingAddressValidation.getErrorItemBags())

            const contactInfoValidationRule = {
                telephone: "nullable|number",
                mobileNo: "required|number",
                email: "nullable|email"
            }
            const contactInfoValidation = new FormValidator({
                data: contactInfo,
                rules: contactInfoValidationRule,
                messages: {},
                dbData: {},
                rowNo: 1
            }).getErrorItemBag()
            // console.log("contactInfoValidation", contactInfoValidation.getErrorItemBags())
            const customers = await this.customerRepository.find({
                where: {
                    officialIdNo: kycInfo?.officialIdNo
                },
                select: {
                    officialIdNo: true
                }
            })
            const kycValidation = new FormValidator({
                data: kycInfo,
                rules: {
                    kycDocumentProvided: "required|string|exists:chooseOptions",
                    nominationRequired: "required|string|exists:chooseOptions",
                    introducerName: "nullable|string|maxLength:150",
                    panNumber: "required|string|maxLength:30",
                    kycDocumentType: "required|string|exists:documentTypes",
                    officialIdNo: "required|string|maxLength:30|unique:customers,officialIdNo",
                    perAnnumIncome: "nullable|number|maxNum:200000000",
                    requestedAddOn: "required|string|exists:chooseOptions",
                },
                messages: {},
                dbData: {
                    chooseOptions: Object.values(ChooseOptions),
                    documentTypes: Object.values(DocumentType),
                    customers: customers
                },
                rowNo: 1
            }).getErrorItemBag()
            const addOnValidationRule = {
                eStatement: "required|string|exists:chooseOptions",
                chequeBook: "required|string|exists:chooseOptions",
                mobileBanking: "required|string|exists:chooseOptions",
                internetBanking: "required|string|exists:chooseOptions",
                creditCard: "required|string|exists:chooseOptions",
                requestedDebitCard: "required|string|exists:chooseOptions",
            }

            const addOnValidation = new FormValidator({
                data: addOnInfo,
                rules: addOnValidationRule,
                messages: {},
                dbData: {
                    chooseOptions: Object.values(ChooseOptions),
                    documentTypes: Object.values(DocumentType)
                },
                rowNo: 1
            }).getErrorItemBag()
            // console.log("kycValidation", kycValidation)
            const errorBucket = [accountInfoValidation, personalInfoValidation, permanentAddressValidation, residentialAddressValidation, correspondingAddressValidation, contactInfoValidation, kycValidation, addOnValidation]
            errorBucket.forEach((errorItems: any[], index: number) => {
                if (errorItems.length) {
                    validatonErrors.push(...errorItems.flat())
                    // delete errorItems;
                }
            })
            // if(kycValidation.length)
            if (validatonErrors.length) {
                return {
                    message: "Validation Unsuccessful",
                    errors: validatonErrors
                }
            }
            console.log("errors ", validatonErrors)

            // create customer
            // create address of customer
            // create bank account 
            // create kyc info of customer
            // create addon info of customer 
            // attach account to customer
            const customerData: Partial<Customer> = {
                officialIdNo: kycInfo.officialIdNo,
                _oid: this.appService.generateOid(),
                title: personalInfo?.title,
                guardianName: personalInfo.guardianName,
                firstName: personalInfo.firstName,
                middleName: personalInfo.middleName,
                lastName: personalInfo.lastName,
                gender: personalInfo.gender,
                email: contactInfo.email,
                telephone: contactInfo.telephone,
                phoneNumber: contactInfo.mobileNo,
                occupation: personalInfo.occupation,
                maritalStatus: personalInfo.maritalStatus,
                category: personalInfo.category,
                nationality: personalInfo.nationality,
                countryOfResidence: personalInfo.countryOfResidence,
                dateOfBirth: DateAndTimeService.convertToDate(personalInfo.dateOfBirth, DateFormatType.DD_MM_YYYY),
                kycDocumentProvided: kycInfo.kycDocumentProvided,
                nominationRequired: kycInfo.nominationRequired,
                introducerName: kycInfo.introducerName,
                panNumber: kycInfo.panNumber,
                kycDocumentType: kycInfo.kycDocumentType,
                perAnnumIncome: kycInfo.perAnnumIncome,
                requestedAddOn: kycInfo.requestedAddOn,
                addedByStaffId: user.id,
            }

            let customer = await this.customerRepository.save(customerData)
            let permanentAddress = this.prepareAddress(permanentAddressInfo, user, customer.id, AddressType.HOME)
            let residentAddress = this.prepareAddress(residentialAddressInfo, user, customer.id, AddressType.HOME)
            let contactAddress = this.prepareAddress(correspondingAddressInfo, user, customer.id, AddressType.WORK)
            const customerAddresses = await this.customerAddressRepository.insert([permanentAddress, residentAddress, contactAddress])
            const branch = await this.branchRepostory.findOne({ where: { branchCode: accountInfo.branchCode } })
            const bankAccountData: Partial<BankAccount> = {
                _oid: this.appService.generateOid(),
                accountNumber: await this.accountNumberGenerator(),
                branchOid: branch?._oid,
                status: accountInfo.status,
                accountType: accountInfo.accountType,
                currency: "INR"
            }
            console.log("bankAccountDatabankAccountData--->", bankAccountData)

            // const bankAccount = this.bankAccountRepository.create(bankAccountData);
            const account = await this.bankAccountRepository.save(bankAccountData);

            console.log("Created bank account: ", account);
            if (customer) {
                const bankAccountCustomer = this.bankAccountCustomersRepository.create({
                    _oid: this.appService.generateOid(),
                    bankAccountId: account.id,
                    customerId: customer.id
                });
                await this.bankAccountCustomersRepository.save(bankAccountCustomer);
            }
            const addOnData: Partial<AddOnFeature> = {
                _oid: this.appService.generateOid(),
                bankAccountId: account.id,
                customerId: customer.id,
                eStatement: addOnInfo.eStatement,
                chequeBook: addOnInfo.chequeBook,
                mobileBanking: addOnInfo.mobileBanking,
                internetBanking: addOnInfo.internetBanking,
                creditCard: addOnInfo.creditCard,
                requestedDebitCard: addOnInfo.requestedDebitCard,
                addedByStaffId: user.id,
            }
            const addon = this.addonFeatureRepostory.save(addOnData)


            return {
                message: 'Bank account created successfully',
                data: bankAccountData,
                errors: []
            };
        } catch (error) {
            throw error;
        }
    }
    private prepareAddress(address: AddressInfoRequestDto, user: User, customerId: bigint, addressType: AddressType = AddressType.HOME): Partial<CustomerAddress> {
        return {
            _oid: this.appService.generateOid(),
            addressLabel: addressType,
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            houseNo: address.houseNo,
            buildingName: address.buildingName,
            flatNo: address.flatNo,
            streetName: address.streetName,
            streetNo: address.streetNo,
            landmark: address.landmark,
            district: address.district,
            city: address.city,
            state: address.state,
            country: address.country,
            postalCode: address.postalCode,
            phoneNumber: address.phoneNumber,
            isDefault: addressType === AddressType.HOME ? true : false,
            status: AddressStatus.ACTIVE,
            addedById: user.id,
            customerId: customerId,
            remarks: address.remarks
        }
    }

    private async bankAccountList(search: BankAccountSearchDto) {
        this.setSearchProperties(search);
        console.log("search ", this.limit, this.offset)
        let query = this.bankAccountRepository
            .createQueryBuilder('bank_accounts')
            .leftJoinAndSelect('bank_accounts.customers', 'bank_customers')
            .leftJoinAndSelect('bank_customers.customer', 'customer')
            .leftJoinAndSelect('bank_accounts.branchInfo', 'branch')
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
                'bank_accounts.branchOid',
                'branch.branchCode',
                'branch.branchName',

                'bank_accounts.createdAt',

                'bank_customers.bankAccountId',
                'bank_customers.customerId',
                'bank_customers._oid',
                'customer.id',
                "'sdfjsklj' as test",
                "CONCAT(customer.firstName, ' ', customer.middleName, ' ', customer.lastName) AS fullName",
                'customer.firstName',
                'customer.lastName',
                'customer.middleName',
                'customer.email',
                'customer.phoneNumber',
                'customer._oid'
            ]);
        if (this.searchFieldName && this.searchFieldValue) {
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
            let [bankAccounts, count] = await this.bankAccountList(search);
            console.log("bankAccounts", bankAccounts)
            bankAccounts = bankAccounts?.map(account => {
                Object.assign(account, {
                    branchName: account?.branchInfo?.branchName,
                    branchCode: account?.branchInfo?.branchCode,
                })
                delete account.branchInfo;
                return account
            })
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
            const bankAccount = await this.bankAccountRepository.findOne({
                where: { _oid },
                relations: ['customers', 'customers.customer']
            });
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
