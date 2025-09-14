import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdatePermissionOfRoleDto, UpdateRoleDto } from './dto/update-role.dto';
import { BaseService } from 'src/common/services/base-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@src/role/entities/role.entity';
import { ILike, In, Repository } from 'typeorm';
import { AppService } from 'src/app.service';
import { ListResponseDto } from 'src/common/dto/ListResponseDto';
import { RoleSearchDto } from './dto/RoleSearchDto';
import { User } from 'src/users/entities/user.entity';
import { Permission } from '@src/permission/entities/permission.entity';
import { RoleHasPermission } from '@src/role-has-permission/entities/role-has-permission.entity';
import { RoleDetailDto, RoleDetailResponseDto } from './dto/role-detail.dto';

@Injectable()
export class RoleService extends BaseService {

    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        @InjectRepository(Permission)
        private readonly permissionRepostiry: Repository<Permission>,
        @InjectRepository(RoleHasPermission)
        private readonly roleHasPermissionRepository: Repository<RoleHasPermission>,
        private readonly appService: AppService,
    ) {
        super()
    }
    create(createRoleDto: CreateRoleDto) {
        return 'This action adds a new role';
    }

    private async roleList(search: RoleSearchDto) {
        this.setSearchProperties(search);
        console.log("search ", this.limit, this.offset, this.sortBy, this.sortOrder)
        let query = this.roleRepository
            .createQueryBuilder('roles')
            // .leftJoinAndSelect("roles.permissions", "permissions")
            .select([
                'roles.id',
                'roles._oid',
                'roles.name',
                'roles.createdAt',
                'roles.updatedAt',
                // "permissions.permissionId",
                // "permissions.roleId",
            ])
            // .leftJoin('role_has_permissions', 'rhp', 'rhp.roleId = roles.id')
            // .addSelect('COUNT(rhp.permissionId)', 'permissionsCount') // 👈 count permissions
            // .groupBy('roles.id');
        if (this.searchFieldName) {
            query = query.where({
                [this.searchFieldName]: this.searchFieldValue ? ILike(`%${this.searchFieldValue}%`) : undefined,
            })
        }
        if (this.sortBy && this.sortOrder) {
            query = query.orderBy('roles.' + this.sortBy, this.sortOrder);
        }

        return await query.skip(this.offset)
            .take(this.limit)
            .getManyAndCount();
    }

    async findAll(search: RoleSearchDto) {
        try {
            const [roles, count] = await this.roleList(search);
            console.log("roles", roles)
            // roles.map(item => {
            //     Object.assign(item ,{
            //         permissionCount: item.permissions?.length,
            //     })
                
            //     return item;
            // })
            return {
                message: 'Roles retrieved successfully',
                data: new ListResponseDto(roles, count, this.limit, this.page),
            }
        } catch (error) {
            console.log("errorerror", error)
        }
        return `This action returns all role`;
    }

    async updatePermissionOfRole(_oid: string, request: UpdatePermissionOfRoleDto, user: User): Promise<any> {
        try {
            const role: Role | null = await this.roleRepository.findOne({ where: { _oid: _oid } })

            if (!role) {
                throw new NotFoundException(`Role with oid ${_oid} not found`);
            }
            const { permissionNames } = request
            // if(!perimssionIds.length)
            // console.log("rolerole", role)
            const permissions = await this.permissionRepostiry.find({
                where: {
                    name: In(permissionNames),
                }
            })
            // console.log("permissions", permissions, permissionNames)
            const missing: string[] = [];
            permissionNames.map(permissionName => {
                if (!permissions.find(item => item.name === permissionName)) missing.push(permissionName);
            })
            if (missing.length) {
                throw new NotFoundException(`Permission with ID ${missing.join(',')} not found.`)
            }
            // const existingPermissions = await this.roleHasPermissionRepository.find({
            //     where: { roleId: role?.id },
            //     // relations: ['role']
            // })
            // console.log("existingPermissionsexistingPermissions", existingPermissions)
            const data: RoleHasPermission[] = [];
            permissions.map(item => {
                // if (!existingPermissions.find(existingPermissionItem => existingPermissionItem.permissionId === item.id)) {
                    
                // }
                data.push({
                    _oid: this.appService.generateOid(),
                    roleId: role.id,
                    permissionId: item.id
                } as RoleHasPermission)
            })
            await this.roleHasPermissionRepository.delete({roleId: role.id})
            // if(existingPermissions.length){
            // }
            const savedPermissions = await this.roleHasPermissionRepository.save(data)
            return {
                message: 'Permission successfully attached to Role.',
                data: savedPermissions,
            }
        } catch (error) {
            throw error;
        }
    }

    async findOne(_oid: string): Promise<RoleDetailResponseDto> {
        try {
            // const role: Role | null = await this.roleRepository.findOne({
            //     where: { _oid },
            //     relations: [
            //         "permissions",
            //         'permissions.permission'
            //     ]
            // })
            let role: Role | null = await this.roleRepository
                .createQueryBuilder('role')
                .leftJoin('role.permissions', 'rhp')
                .leftJoin('rhp.permission', 'permission')
                .select([
                    'role._oid',
                    'role.name',
                    'rhp.id',
                    'permission.id',
                    'permission.name',
                    'permission.group',
                ])
                .where('role._oid = :oid', { oid: _oid })
                .getOne();
            if (!role) {
                throw new NotFoundException(`Role with oid ${_oid} not found`);
            }
            let permissions = role?.permissions?.map(permission => {
                return {
                    id: permission.permission.id,
                    name: permission.permission.name,
                    group: permission.permission.group
                }
            })
            delete role.permissions;
            return {
                data: {
                    role,
                    permissions
                }
            }

        } catch (error) {
            console.log("error is ", error)
            throw error;
        }
    }

    update(id: number, updateRoleDto: UpdateRoleDto) {
        return `This action updates a #${id} role`;
    }

    remove(id: number) {
        return `This action removes a #${id} role`;
    }
}
