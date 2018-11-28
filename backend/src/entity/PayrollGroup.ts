import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, PrimaryColumn } from "typeorm";
import { PayrollEntry } from "./PayrollEntry";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class PayrollGroup {
    @Field(type => ID)
    @PrimaryColumn()
    public id: string;

    constructor(id: string) {
        this.id = id;
    }

    @Field()
    @Column()
    hourlyRate: number;

    @Field(type => [PayrollEntry])
    @OneToMany(type => PayrollEntry, entry => entry.payrollGroup)
    entries?: PayrollEntry[];
}