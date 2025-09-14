import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
@Entity()
export class BranchManager {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Unique(['_oid'])
    _oid: string;

    @Column()
    name?: string;

    @Column()
    email: string;

    @Column()
    phoneNumber?: string;

    @Column()
    address?: string;

    @Column()
    position?: string;

    @Column()
    salary?: number;

    @Column()
    hireDate?: Date;

    @Column()
    terminationDate?: Date;
   
    branchId: number;
    @ManyToOne(() => BranchManager, (branch) => branch.id)
    @JoinColumn({ name: 'branchId' })
    branch: BranchManager;
    
}
