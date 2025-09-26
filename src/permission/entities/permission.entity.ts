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

    @ManyToMany(() => Role, role => role.permissions)
    roles: Role[];
}
