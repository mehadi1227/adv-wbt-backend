import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ProfileEntity } from "./profile.entity";

@Entity("activities")
export class ActivityEntity
{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @OneToMany(() => ProfileEntity, profile => profile.activities, { nullable: false, cascade: false })
    conducted_by: ProfileEntity[]

    @Column("varchar", { length: 255, nullable: false })
    activity_title: string

    @Column("varchar", { length: 255, nullable: false })
    activity_description: string

    @CreateDateColumn()
    created_at: Date

}