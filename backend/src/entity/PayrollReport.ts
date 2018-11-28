import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class PayrollReport {
    @Field()
    employee: number;

    @Field()
    year: number;

    @Field()
    month: number;

    @Field()
    isFirstHalf: boolean;

    @Field()
    amountPaid: number;
}