import { Permission } from "src/permission/entities/permission.entity";
import { Role } from "src/role/entities/role.entity";
import { CommonEntity } from "src/shared/entities/CommonEntity";
import { Column, Entity, JoinColumn, ManyToOne, Unique } from "typeorm";

@Entity({ name: "role_has_permissions" })
@Unique(['permissionId', 'roleId']) 
export class RoleHasPermission extends CommonEntity {
    @Column()
    roleId: bigint;

    @ManyToOne(() => Role, (role) => role.id, { nullable: false })
    @JoinColumn({ name: 'roleId' })
    role: Role;


    @Column()
    permissionId: bigint;

    @ManyToOne(() => Permission, (role) => role.id, { nullable: false })
    @JoinColumn({ name: 'permissionId' })
    permission: Permission;
}
