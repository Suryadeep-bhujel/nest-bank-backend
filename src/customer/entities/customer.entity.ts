import { GenderType, MaritalStatus, Occupation, PersonCaste, PersonTitle } from "@bank-app-common/enum/SharedEnum";
import { CommonEntity } from "src/shared/entities/CommonEntity";
import { User } from "src/users/entities/user.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
@Entity({ name: 'customers' })
export class Customer extends CommonEntity {
    @Column({ length: 30, unique: true})
    officialIdNo: string

    @Column({ length: 50, default: null })
    title?: PersonTitle;

    @Column({ length: 150 })
    guardianName?: string;

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
