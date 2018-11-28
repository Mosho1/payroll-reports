import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { PayrollGroup } from "./PayrollGroup";
import { PayrollLog } from "./PayrollLog";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class PayrollEntry {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id?: number;

    @Field()
    @Column({type: 'date'})
    date: Date;

    @Field()
    @Column({type: 'float'})
    hoursWorked: number;

    @Field()
    @Column()
    employee: number;

    @Field(type => PayrollGroup)
    @ManyToOne(type => PayrollGroup, group => group.entries)
    payrollGroup?: PayrollGroup;

    @Field(type => PayrollLog)
    @ManyToOne(type => PayrollLog, report => report.entries)
    payrollLog: PayrollLog

}