// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Unique, BeforeInsert, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Role } from '@src/role/entities/role.entity';
import { ModelHasRole } from '@src/model-has-role/entities/model-has-role.entity';
export enum UserRole {
    ADMIN = 'admin',
    SUPER_ADMIN = 'super-admin',
    DIRECTOR = 'director',
    MANAGER = 'manager',
    STAFF = 'staff',
}
@Entity({ name: 'users' })
@Unique(['_oid'])
@Unique(['username'])
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: bigint;

    @Column({ length: 32 })
    // @Unique(['_oid'])
    _oid: string;

    @Column()
    name?: string;

    @Column()
    // @Unique(['username'])
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @OneToMany(() => ModelHasRole, mhr => mhr.user)
    modelHasRoles: ModelHasRole[];

    @Column({ type: 'varchar', length: 100, unique: false , nullable:true})
    userId: string;

    // Indirect roles (via modelHasRoles)
    @ManyToMany(() => Role, role => role.users)
    @JoinTable({
        name: 'model_has_roles',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
    })
    roles?: Role[];

    @BeforeInsert()
    generateOidAndHashPassword() {
        console.log('Generating OID and hashing password...');
        this._oid = uuidv4().replace(/-/g, ''); // 32-char UUID
        this.password = bcrypt.hashSync(this.password, 10); // hash password
    }

}
