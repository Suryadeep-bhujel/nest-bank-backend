import { User } from "src/users/entities/user.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
export enum GenderTypes  {
    MALE = 'MALE', 
    FEMALE = "FEMALE", 
    OTHER = "OTHER",
    NOT_SPECIFIED ="NOT_SPECIFIED"
}
@Entity({ name: 'customers' })
export class Customer {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: bigint;

    @Column({ length: 32 })
    @Unique(['_oid'])
    _oid: string;

    @Column({ length: 50 })
    firstName?: string;

    @Column({ length: 50 })
    middleName?: string;

    @Column({ length: 50 })
    lastName?: string;

    @Column({ type: "enum", enum: GenderTypes, default: "NOT_SPECIFIED" })
    gender?: string;


    @Column()
    email: string;

    @Column()
    phoneNumber?: string;

    @Column({ nullable: true, type: "timestamptz" })
    dateOfBirth?: Date;

    @Column()
    addedByStaffId?: bigint;

    @ManyToOne(() => User, (staff) => staff.id, { nullable: true })
    @JoinColumn({ name: 'addedByStaffId' })
    addedBy?: User | null;

    @BeforeInsert()
    setDefaultValues() {
        console.log('Setting default values...');
    }
}
