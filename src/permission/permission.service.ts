import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ListResponseDto } from 'src/common/dto/ListResponseDto';
import { BaseService } from '@src/common/services/base-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '@src/permission/entities/permission.entity';
import { ILike, Repository } from 'typeorm';
import { AppService } from 'src/app.service';

@Injectable()
export class PermissionService extends BaseService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
        private readonly appService: AppService,
    ) {
        super()
    }
    create(createPermissionDto: CreatePermissionDto) {
        return 'This action adds a new permission';
    }
    private async permissionList() {
        let query = this.permissionRepository
            .createQueryBuilder('permissions');

        if (this.searchFieldName) {
            query = query.where({
                [this.searchFieldName]: this.searchFieldValue ? ILike(`%${this.searchFieldValue}%`) : undefined,
            })
        }
        if (this.sortBy && this.sortOrder) {
            query = query.orderBy('permissions.' + this.sortBy, this.sortOrder);
        }

        return await query.skip(this.offset)
            // .take(this.limit)
            .getManyAndCount();
    }
    async findAll() {
        try {
            const [permissions, count] = await this.permissionList();
            // console.log("permissions", permissions)
            return new ListResponseDto(permissions as Permission[], count, this.limit, this.page);
        } catch (error) {
            console.log("error ", error)
            throw error
        }
    }

    findOne(id: number) {
        return `This action returns a #${id} permission`;
    }

    update(id: number, updatePermissionDto: UpdatePermissionDto) {
        return `This action updates a #${id} permission`;
    }

    remove(id: number) {
        return `This action removes a #${id} permission`;
    }
}
