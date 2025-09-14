
import { Customer } from "src/customer/entities/customer.entity";
import { CommonEntity } from "src/shared/entities/CommonEntity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'customer_addresses' })
export class CustomerAddress extends CommonEntity {

    @Column({ type: "enum", enum: ['HOME', "WORK", "OTHER", "NOT_SPECIFIED"], nullable: true , default: 'HOME' })
    addressLabel?: string;

    @Column({ length: 50 , nullable: true})
    addressLine1?: string;

    @Column({ length: 50, nullable: true})
    addressLine2?: string;

    @Column({ length: 50, nullable: true})
    city?: string;

    @Column({ length: 50, nullable: true})
    state?: string;

    @Column({ length: 50, nullable: true})
    country?: string;

    @Column({ length: 50, nullable: true})
    postalCode?: string;

    @Column({ length: 50 , nullable: true})
    phoneNumber?: string;

    @Column({ type: "bool", default: true })
    isDefault?: boolean;

    @Column({ type: "enum", enum: ['ACTIVE', "INACTIVE", "DELETED", "NOT_SPECIFIED", "SUSPENDED", "ON_HOLD", "BLACK_LISTED"], default: 'ACTIVE' })
    status?: string;

    @Column({ type: "bool", default: false })
    isDeleted?: boolean;

    @Column({ type: "date" , default: () => "CURRENT_TIMESTAMP" })
    createdAt?: Date;

    @Column({ type: "date", default: () => "CURRENT_TIMESTAMP" })
    updatedAt?: Date;

    @Column({ type: "date", nullable: true })
    deletedAt?: Date;

    @Column({ type: "bigint" , nullable: true })
    addedById?: bigint;

    @ManyToOne(() => User, (staff) => staff.id, { nullable: true })
    @JoinColumn({ name: 'addedById' })
    addedBy: User | null;

    @Column({ type: 'bigint', nullable: false })
    customerId?: bigint;

    @ManyToOne(() => Customer, (customer) => customer.id, { nullable: false })
    @JoinColumn({ name: 'customerId' })
    customer?: Customer | null;

    @Column({ length: 500, nullable: true, default: null })
    remarks?: string;

}
