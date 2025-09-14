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

    findOne(id: number) {
        return `This action returns a #${id} branch`;
    }

    update(id: number, updateBranchDto: UpdateBranchDto) {
        return `This action updates a #${id} branch`;
    }

    remove(id: number) {
        return `This action removes a #${id} branch`;
    }
}
