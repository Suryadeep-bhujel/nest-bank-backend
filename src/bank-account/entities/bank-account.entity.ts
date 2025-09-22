import { CommonEntity } from "@src/shared/entities/CommonEntity";
import { Customer } from "src/customer/entities/customer.entity";
import { SharedStatus } from "src/shared/utils/SharedEnum";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity({ name: 'bank_accounts' })
export class BankAccount extends CommonEntity {

    @Column({ length: 32 , unique: true})
    accountNumber: string;

    @Column()
    accountType: string;

    @Column()
    balance: number;

    @Column({ length: 3 })
    currency: string;

    @Column({ type: "enum", enum: SharedStatus, default: SharedStatus.ON_REVIEW })
    status: SharedStatus;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}

@Entity({ name: 'bank_account_customers' })
export class BankAccountCustomers extends CommonEntity {
    @Column()
    bankAccountId: bigint;
    @Column()
    customerId: bigint;
    @ManyToOne(() => BankAccount, bankAccount => bankAccount._oid, { eager: true })
    bankAccount: BankAccount;
    @ManyToOne(() => Customer, customer => customer._oid, { eager: true })
    customer: Customer;
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}

