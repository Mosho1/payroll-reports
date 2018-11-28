
import { PrimaryColumn, Entity, OneToMany } from "typeorm";
import {ObjectType, Field, ID} from 'type-graphql';
import { PayrollGroup } from "./PayrollGroup";
import { PayrollEntry } from "./PayrollEntry";

@ObjectType()
@Entity()
export class PayrollLog {
    @Field(type => ID)
    @PrimaryColumn()
    id: number;

    @Field(type => [PayrollEntry])
    @OneToMany(type => PayrollEntry, entry => entry.payrollLog, { cascade: true })
    entries?: PayrollEntry[];
}