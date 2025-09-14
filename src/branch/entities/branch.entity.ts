// src/users/user.entity.ts
import { User } from 'src/users/entities/user.entity';
import { Staff } from '../../../src/staff/entities/staff.entity';
// import { User } from './../../../src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
export enum BranchStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    PENDING = 'PENDING',
    SUSPENDED = 'SUSPENDED',
    CLOSED = 'CLOSED',
    UNDER_REVIEW = 'UNDER_REVIEW',
    TERMINATED = 'TERMINATED',
    DELETED = 'DELETED',
    ARCHIVED = 'ARCHIVED',
    BLOCKED = 'BLOCKED',
    FROZEN = 'FROZEN',
    DORMANT = 'DORMANT',
    SUSPENDED_FOR_VERIFICATION = 'SUSPENDED_FOR_VERIFICATION',
    SUSPENDED_FOR_COMPLIANCE = 'SUSPENDED_FOR_COMPLIANCE',
    SUSPENDED_FOR_SECURITY = 'SUSPENDED_FOR_SECURITY',
    SUSPENDED_FOR_FRAUD = 'SUSPENDED_FOR_FRAUD',
    SUSPENDED_FOR_ABUSE = 'SUSPENDED_FOR_ABUSE'
}
@Entity({ name: 'branches' })
export class Branch {
    @PrimaryGeneratedColumn()
    id: bigint;
    @Column()
    @Unique(['_oid'])
    _oid: string;

    @Column()
    branchName?: string;

    @Column({ nullable: true })
    managerId?: number;

    @Column()
    branchCode?: string;

    @Column()
    branchAddress?: string;

    @Column()
    branchPhoneNumber?: string;

    @Column()
    branchEmail?: string;

    @Column()
    branchWebsite?: string;

    @Column()
    branchDescription?: string;

    @Column()
    branchType?: string;

    @ManyToOne(() => User, (staff) => staff.id, { nullable: true })
    @JoinColumn({ name: 'managerId' })
    manager?: User | null;

    @Column()
    branchStatus?: BranchStatus;
}
