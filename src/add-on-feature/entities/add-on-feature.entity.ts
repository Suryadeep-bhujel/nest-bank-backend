import { ChooseOptions } from "@bank-app-common/enum/SharedEnum";
import { BankAccount } from "@src/bank-account/entities/bank-account.entity";
import { Customer } from "@src/customer/entities/customer.entity";
import { CommonEntity } from "@src/shared/entities/CommonEntity";
import { User } from "@src/users/entities/user.entity";
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

    @Column({ type: "enum", enum: ChooseOptions, default: ChooseOptions.NOT_APPLICABLE })
    eStatement: ChooseOptions

    @Column({ type: "enum", enum: ChooseOptions, default: ChooseOptions.NOT_APPLICABLE })
    chequeBook: ChooseOptions

    @Column({ type: "enum", enum: ChooseOptions, default: ChooseOptions.NOT_APPLICABLE })
    mobileBanking: ChooseOptions

    @Column({ type: "enum", enum: ChooseOptions, default: ChooseOptions.NOT_APPLICABLE })
    internetBanking: ChooseOptions

    @Column({ type: "enum", enum: ChooseOptions, default: ChooseOptions.NOT_APPLICABLE })
    creditCard: ChooseOptions

    @Column()
    addedByStaffId?: bigint;

    @ManyToOne(() => User, (staff) => staff.id, { nullable: true })
    @JoinColumn({ name: 'addedByStaffId' })
    addedBy?: User | null;
}
