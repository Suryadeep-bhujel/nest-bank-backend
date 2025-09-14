import { Permission } from "@src/permission/entities/permission.entity";
import { RoleHasPermission } from "@src/role-has-permission/entities/role-has-permission.entity";
import { CommonEntity } from "@src/shared/entities/CommonEntity";
import { User } from "@src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, Unique } from "typeorm";
export interface HasPermission {
    roleId: bigint;
    permissionId: bigint;
}
@Entity({ name: "roles" })
@Unique(['name'])
export class Role extends CommonEntity {
    @Column()
    name: string;

    @OneToMany(() => RoleHasPermission, (rhp) => rhp.role)
    permissions?: RoleHasPermission[];

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt?: Date;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt?: Date;

    @ManyToMany(() => User, user => user.roles)
    users: User[];

}
