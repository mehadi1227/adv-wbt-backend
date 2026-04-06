import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { TransactionEntity } from "./transaction.entity";
import { ActivityEntity } from "src/admin/entities/activity.enitity";

@Entity('Profiles')
export class ProfileEntity
{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => UserEntity, user => user.profile, { nullable: false, cascade: true })
    user: UserEntity

    @Column('varchar', { length: 255, nullable: false })
    full_name: string

    @Column('varchar', { length: 255, nullable: true })
    address: string

    @Column('varchar', { length: 255, nullable: true })
    designation: string

    @Column("varchar", {length: 255, nullable: false})
    cv_path: string

    @ManyToOne(() => TransactionEntity, transations => transations.issued_by || transations.transaction_to, { nullable: true, cascade: false })
    @JoinColumn()
    transactions: TransactionEntity[]

    @ManyToOne(() => ActivityEntity, activities => activities.conducted_by, { nullable: true, cascade: false })
    @JoinColumn()
    activities: ActivityEntity[]

}