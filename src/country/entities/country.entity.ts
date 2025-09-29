import { CountryStatus, SanctionStatus } from "@bank-app-common/enum/SharedEnum";
import { CommonEntity } from "@src/shared/entities/CommonEntity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'countries' })
export class Country extends CommonEntity {
    @Column({ length: 64, unique: true })
    countryName: string;

    @Column({ length: 8, unique: true })
    countryCode: string;

    @Column({ length: 5, unique: false })
    dialCode: string; // e.g. 91 for India

    @Column({ type: "enum", enum: CountryStatus, default: CountryStatus.ACTIVE })
    status?: string;

    @Column({ type: "enum", enum: SanctionStatus, default: SanctionStatus.CLEARED })
    sanctionStatus?: string;
}
