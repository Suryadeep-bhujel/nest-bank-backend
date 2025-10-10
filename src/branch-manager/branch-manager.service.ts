import { Injectable } from '@nestjs/common';
import { CreateBranchManagerDto } from '@src/branch-manager/dto/create-branch-manager.dto';
import { UpdateBranchManagerDto } from '@src/branch-manager/dto/update-branch-manager.dto';
import { ManagerSearchDto } from '@src/branch-manager/dto/manager-search.dto';
import { User } from 'src/users/entities/user.entity';
import { CommonListReponse, ListResponseDto } from 'src/common/dto/ListResponseDto';
import { BaseService } from '@src/common/services/base-service';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchManager } from './entities/branch-manager.entity';
import { ILike, IsNull, Not, Repository } from 'typeorm';
import { Branch } from 'src/branch/entities/branch.entity';

@Injectable()
export class BranchManagerService extends BaseService {
    constructor(
        @InjectRepository(Branch)
        private readonly branchRepository: Repository<Branch>,
    ) {
        super();
    }
    create(createBranchManagerDto: CreateBranchManagerDto) {
        return 'This action adds a new branchManager';
    }

    private async branchManagerList(search: ManagerSearchDto) {
        this.setSearchProperties(search);
        return await this.branchRepository.findAndCount({
            where: {
                managerOid: Not(IsNull()),
                [this.searchFieldName]: this.searchFieldValue ? ILike(`%${this.searchFieldValue}%`) : undefined,
            },
            order: {
                id: 'DESC',
            },
            skip: this.offset,
            take: this.limit,
        });
    }

    async findAll(search: ManagerSearchDto, user: User): Promise<CommonListReponse> {
        try {
            const [data, total] = await this.branchManagerList(search);
            // const data = [];
            // const total = 0;
            // this.setSearchProperties(search);
            return {
                message: 'Branch Manager fetched successfully',
                data: new ListResponseDto(data, total, this.limit, this.page),
            }
        } catch (error) {
            throw new Error(`Error finding branch managers: ${error.message}`);
        }
    }

    findOne(id: number) {
        return `This action returns a #${id} branchManager`;
    }

    update(id: number, updateBranchManagerDto: UpdateBranchManagerDto) {
        return `This action updates a #${id} branchManager`;
    }

    remove(id: number) {
        return `This action removes a #${id} branchManager`;
    }
}
