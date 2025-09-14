import { RoleHasPermission } from "@src/role-has-permission/entities/role-has-permission.entity";
import { Role } from "@src/role/entities/role.entity";
import { CommonEntity } from "@src/shared/entities/CommonEntity";
import { User } from "@src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'user_has_roles' })
@Unique(['userId', 'roleId'])
export class ModelHasRole {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: bigint;

  @Column({ type: 'bigint' })
  roleId: bigint;

  @ManyToOne(() => Role, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @Column({ type: 'bigint' })
  userId: bigint;

  @ManyToOne(() => User, user => user.modelHasRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;
}

