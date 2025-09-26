import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { ILike, Repository } from 'typeorm';
import { Branch } from './entities/branch.entity';
import { AppService } from 'src/app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchSearchDto } from './dto/branch-search.dto';
import { BaseService } from 'src/common/services/base-service';
import { ListResponseDto } from 'src/common/dto/ListResponseDto';

@Injectable()
export class BranchService extends BaseService {

    public constructor(
        @InjectRepository(Branch)
        private readonly branchRepository: Repository<Branch>,
        private readonly appService: AppService,
    ) {
        super();
        // this.branchRepository = branchRepository;

    }
    async create(createBranchDto: CreateBranchDto) {
        try {
            createBranchDto._oid = this.appService.generateOid();
            console.log(createBranchDto);
            const newBranchData: Branch = await this.branchRepository.save(createBranchDto as Branch);
            return {
                message: 'Branch created successfully',
                data: newBranchData,
            };
        } catch (error) {
            console.error('Error creating branch:', error);
            throw new Error('Branch creation failed'); // Handle error appropriately

        }
    }
    private async branchList(search: BranchSearchDto) {
        return await this.branchRepository.findAndCount({
            where: {
                [this.searchFieldName]: this.searchFieldValue ? ILike(`%${this.searchFieldValue}%`) : undefined,
                // isDeleted: false,
            },
            order: {
                id: 'DESC',
            },
            skip: this.offset,
            take: this.limit,
            // relations: ['createdBy', 'updatedBy'],
        });
    }
    async findAll(search: BranchSearchDto) {
        try {
            this.setSearchProperties(search);
            const [data, total] = await this.branchList(search);
            return {
                message: 'Branches fetched successfully',
                data: new ListResponseDto(data, total, this.limit, this.page),
            }

        } catch (error) {
            console.error('Error fetching branches:', error);
            throw new Error('Branch fetching failed'); // Handle error appropriately    
        }
    }

    async branchDropdown(search: BranchSearchDto) {
        try {
            this.setSearchProperties(search);
            const [data, total] = await this.branchRepository.findAndCount({
                select: ['branchName', 'branchCode'],
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
                message: 'Branch dropdown fetched successfully',
                data: new ListResponseDto(data, total, this.limit, this.page),
            };
        } catch (error) {
            console.error('Error fetching branch dropdown:', error);
            throw new Error('Branch dropdown fetching failed');
        }
    }

    async findOne(_oid: string) {
        try {
            const branch = await this.branchRepository.findOne({ where: { _oid: _oid } });
            if (!branch) {
                return {
                    message: `Branch with id ${_oid} not found`,
                    data: null,
                };
            }
            return {
                message: 'Branch fetched successfully',
                data: branch,
            };
        } catch (error) {
            console.error('Error fetching branch:', error);
            throw new Error('Branch fetching failed');
        }
    }

    async update(_oid: string, updateBranchDto: UpdateBranchDto) {
        return `This action updates a #${_oid} branch`;
    }

    async remove(_oid: string) {
        try {
            const branch = await this.branchRepository.findOne({ where: { _oid } });
            if (!branch) {
                return {
                    message: `Branch with id ${_oid} not found`,
                    data: null,
                };
            }
            // Soft delete if entity has isDeleted flag, otherwise remove
            if ('isDeleted' in branch) {
                (branch as any).isDeleted = true;
                const updated = await this.branchRepository.save(branch);
                return {
                    message: 'Branch deleted successfully',
                    data: updated,
                };
            } else {
                await this.branchRepository.remove(branch);
                return {
                    message: 'Branch deleted successfully',
                    data: null,
                };
            }
        } catch (error) {
            console.error('Error deleting branch:', error);
            throw new Error('Branch deletion failed');
        }
    }
}
