import { Role } from "@src/role/entities/role.entity";
import { CommonEntity } from "@src/shared/entities/CommonEntity";
import { Column, Entity, ManyToMany, Unique } from "typeorm";

@Entity({ name: "permissions" })
export class Permission extends CommonEntity {

    @Column()
    @Unique(['name'])
    name: string;

    @Column()
    group: string;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt?: Date;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt?: Date;

    @ManyToMany(() => Role, role => role.permissions)
    roles: Role[];
}
