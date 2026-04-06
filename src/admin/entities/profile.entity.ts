import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { TransactionEntity } from "./transaction.entity";
import { ActivityEntity } from "src/admin/entities/activity.enitity";

@Entity('Profiles')
export class ProfileEntity
{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => UserEntity, user => user.profile, { nullable: false })
    user: UserEntity

    @Column('varchar', { length: 255, nullable: false })
    full_name: string

    @Column('varchar', { length: 255, nullable: true })
    address: string

    @Column('varchar', { length: 255, nullable: true })
    designation: string

    @Column("varchar", {length: 255, nullable: false})
    cv_path: string

    @OneToMany(() => TransactionEntity, recieve_transactions => recieve_transactions.transaction_to, {nullable: true, cascade: false})
    recieve_transactions: TransactionEntity[]

    @OneToMany(() => TransactionEntity, issued_transactions => issued_transactions.issued_by, {nullable: true, cascade: false})
    issued_transactions: TransactionEntity[]

    @OneToMany(() => ActivityEntity, activities => activities.conducted_by, { nullable: true, cascade: false })
    @JoinColumn()
    activities: ActivityEntity[]

}