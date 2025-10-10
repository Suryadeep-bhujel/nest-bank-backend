import { Column, Entity } from "typeorm";
import { CommonEntity } from "./CommonEntity";

@Entity({ name: 'table_id_managers' })
export class TableIdManager extends CommonEntity {
    @Column({ type: 'varchar', length: 150, unique: true })
    tableName: string;

    @Column({ type: 'bigint' })
    nextId: number;

    @Column({ type: 'bigint' })
    lastId: number;

    @Column({ type: "varchar", length: 255 , unique: true, nullable: false })
    prefix: string;
}