import { BankAccount } from "@src/bank-account/entities/bank-account.entity";
import { Customer } from "@src/customer/entities/customer.entity";
import { CommonEntity } from "@src/shared/entities/CommonEntity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
@Entity({ name: "addon_features" })
export class AddOnFeature extends CommonEntity {

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
