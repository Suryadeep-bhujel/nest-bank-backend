import { ChooseOptions, DocumentType, GenderType, MaritalStatus, Occupation, PersonCaste, PersonTitle } from "@bank-app-common/enum/SharedEnum";
import { CommonEntity } from "src/shared/entities/CommonEntity";
import { User } from "src/users/entities/user.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
@Entity({ name: 'customers' })
export class Customer extends CommonEntity {
    @Column({ length: 30, unique: true })
    officialIdNo: string

    @Column({ length: 50, default: null })
    title?: PersonTitle;

    @Column({ length: 150 })
    guardianName?: string;

    @Column({ length: 50 })
    firstName?: string;

    @Column({ length: 50, nullable: true })
    middleName?: string;

    @Column({ length: 50 })
    lastName?: string;

    @Column({ type: "enum", enum: GenderType, default: GenderType.UNDISCLOSED })
    gender?: GenderType;


    @Column()
    email: string;

    @Column({ length: 10, default: null })
    mobileNoCountryCode?: string;

    @Column({ length: "20", default: null })
    phoneNumber?: string;

    @Column({ length: 20, default: null })
    telephone?: string;


    @Column({ type: "enum", enum: Occupation, default: Occupation.UNDISCLOSED })
    occupation?: Occupation

    @Column({ type: "enum", enum: MaritalStatus, default: MaritalStatus.UNDISCLOSED })
    maritalStatus?: MaritalStatus

    @Column({ type: "enum", enum: PersonCaste, default: PersonCaste.UNDISCLOSED })
    category?: PersonCaste

    @Column({ length: 10 })
    nationality?: string

    @Column({ length: 10 })
    countryOfResidence?: string


    @Column({ nullable: true, type: "date" })
    dateOfBirth?: Date;

    @Column({ type: "enum", enum: ChooseOptions, default: ChooseOptions.NOT_APPLICABLE })
    kycDocumentProvided?: ChooseOptions

    @Column({ type: "enum", enum: ChooseOptions, default: ChooseOptions.NOT_APPLICABLE })
    nominationRequired?: ChooseOptions

    @Column({ type: "enum", enum: ChooseOptions, default: ChooseOptions.NOT_APPLICABLE })
    requestedDebitCard?: ChooseOptions

    @Column({ length: 150, type: "varchar" })
    introducerName?: string

    @Column({ length: 50, type: "varchar" })
    panNumber?: string

    @Column({ type: "enum", enum: DocumentType, default: DocumentType.OTHER })
    kycDocumentType?: DocumentType

    @Column({ type: "enum", enum: ChooseOptions, default: ChooseOptions.NOT_APPLICABLE })
    requestedAddOn?: ChooseOptions

    @Column({ type: "double precision", nullable: true })
    perAnnumIncome?: number

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
