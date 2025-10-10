import { RoleHasPermission } from "@src/role-has-permission/entities/role-has-permission.entity";
import { Role } from "@src/role/entities/role.entity";
import { CommonEntity } from "@src/shared/entities/CommonEntity";
import { User } from "@src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'user_has_roles' })
@Unique(['userOid', 'roleOid'])
export class UserHasRole extends CommonEntity {
  @Column({ type: 'varchar', length: 32, nullable: false })
  roleOid: string;

  @ManyToOne(() => Role, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roleOid', referencedColumnName: "_oid" })
  role: Role;

  @Column({ type: 'varchar', length: 32, nullable: false })
  userOid: string;

  @ManyToOne(() => User, user => user.modelHasRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userOid', referencedColumnName: '_oid' })
  user: User;
}

