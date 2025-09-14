import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '@src/users/dto/create-user.dto';
import { UpdateUserDto } from '@src/users/dto/update-user.dto';
import { ILike, In, Repository } from 'typeorm';
import { User } from '@src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSearchDto } from '@src/users/dto/users-search.dto';
import { BaseService } from '@src/common/services/base-service';
import { ListResponseDto } from '@src/common/dto/ListResponseDto';
import { UserRolesRequestDto } from '@src/users/dto/user-roles-request.dto';
import { Role } from '@src/role/entities/role.entity';
import { ModelHasRole } from 'src/model-has-role/entities/model-has-role.entity';
import { AppService } from 'src/app.service';

@Injectable()
export class UsersService extends BaseService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Role)
		private readonly roleRepository: Repository<Role>,
		@InjectRepository(ModelHasRole)
		private readonly roleModalRepository: Repository<ModelHasRole>,
		private readonly appService: AppService
	) {
		super()
	}
	async findById(email) {
		console.log("findById", email);
		return await this.userRepository.findOne({ where: { email } });
	}
	create(createUserDto: CreateUserDto) {
		return 'This action adds a new user';
	}
	private async usersList(search: UserSearchDto) {
		this.setSearchProperties(search);
		console.log("search ", this.limit, this.offset)
		let query = this.userRepository
			.createQueryBuilder("users")
		// .leftJoinAndSelect('customers.addedBy', 'addedBy')
		// .select([
		//     // "customers.*",
		//     'customers.id',
		//     'customers.firstName',
		//     'customers.lastName',
		//     'customers.middleName',
		//     'customers.email',
		//     'customers.phoneNumber',
		//     'customers._oid',
		//     'customers.dateOfBirth',
		//     'addedBy.id',
		//     'addedBy.name',
		//     'addedBy._oid',
		//     'addedBy.email'
		// ]);
		if (this.searchFieldName) {
			query = query.where({
				[this.searchFieldName]: this.searchFieldValue ? ILike(`%${this.searchFieldValue}%`) : undefined,
			})

		}
		if (this.sortBy && this.sortOrder) {
			query = query.orderBy('users.' + this.sortBy, this.sortOrder);
		}

		return query.skip(this.offset)
			.take(this.limit)
			.getManyAndCount();

	}

	async findAll(search: UserSearchDto, user: User) {
		console.log("searc", search)
		try {
			const [users, total] = await this.usersList(search)
			return {
				message: "Users retrieved successfully.",
				data: new ListResponseDto(users, total, this.limit, this.page)
			}
		} catch (error) {
			console.log("error is ", error)
			throw error;
		}
	}
	async assignRoleToUser(userOid: string, roles: UserRolesRequestDto, user: User) {
		try {
			const userInfo = await this.userRepository.findOne({ where: { _oid: userOid } })
			if (!userInfo) {
				throw new NotFoundException(`User not found.`)
			}
			const roleList = await this.roleRepository.find({
				where: { name: In(roles.roles) },
				select: {
					_oid: true,
					id: true,
					name: true
				}
			})
			const missing: string[] = [];
			roles.roles.map(roleValue => {
				if (!roleList.find(role => role.name === roleValue)) {
					missing.push(roleValue)
				}
			})
			if (missing.length) {
				throw new NotFoundException(`Role with Name ${missing.join(',')} not found.`)
			}
			const data: ModelHasRole[] = [];
			roleList.map(roleItem => {
				data.push({
					// _oid: this.appService.generateOid(),
					roleId: roleItem.id,
					userId: userInfo.id
				} as ModelHasRole)
			})
			await this.roleModalRepository.delete({ roleId: In(roleList.map(item => item.id)), userId: userInfo.id })
			await this.roleModalRepository.save(data);
			return {
				message: "Role assigned successfully."
			}
		} catch (error) {
			console.log("error is ", error)
			return {
				message: error.message,
				statusCode: 500
			}
		}
	}
	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
