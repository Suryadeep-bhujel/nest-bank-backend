import { BankAccountStatusType } from "@bank-app-common/enum/SharedEnum";
import { CommonEntity } from "@src/shared/entities/CommonEntity";
import { Customer } from "@src/customer/entities/customer.entity";
import { Column, Double, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Branch } from "src/branch/entities/branch.entity";

@Entity({ name: 'bank_accounts' })
export class BankAccount extends CommonEntity {

    @Column({ length: 32, unique: true })
    accountNumber: string;

    @Column()
    accountType: string;

    @Column('decimal', {
        precision: 15,
        scale: 6,
        nullable: true,
        transformer: {
            to: (value?: number | null) => (value === null || value === undefined) ? null : value.toString(),
            from: (value: string | null) => (value === null ? null : parseFloat(value)),
        },
    })
    balance?: number | null;

    @Column({ length: 3 })
    currency?: string;

    @Column({ type: "enum", enum: BankAccountStatusType, default: BankAccountStatusType.ON_REVIEW })
    status: BankAccountStatusType;

    @Column({ length: 32, type: "varchar"})
    branchOid: string;

    @ManyToOne(() => Branch, (branch) => branch._oid, { nullable: false, onUpdate: "CASCADE", onDelete: "SET NULL" })
    @JoinColumn({ name: 'branchOid', referencedColumnName: '_oid' })
    branchInfo?: Branch | null; 

    @OneToMany(() => BankAccountCustomers, (rhp) => rhp.bankAccount)
    customers?: BankAccountCustomers[];

}

@Entity({ name: 'bank_account_customers' })
export class BankAccountCustomers extends CommonEntity {
    @Column()
    bankAccountId: bigint;
    @Column()
    customerId: bigint;
    @ManyToOne(() => BankAccount, bankAccount => bankAccount.id)
    @JoinColumn({ name: 'bankAccountId' })
    bankAccount: BankAccount;

    @ManyToOne(() => Customer, customer => customer.id)
    @JoinColumn({ name: 'customerId' })
    customer: Customer;
}

