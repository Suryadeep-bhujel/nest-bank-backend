import { Column, PrimaryGeneratedColumn, Unique } from "typeorm";

export class CommonEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: bigint;

    @Column({ length: 32 })
    @Unique(['_oid'])
    _oid: string;

    // @Column()
    // @Unique(['liveData'])
    // liveData: boolean;
}