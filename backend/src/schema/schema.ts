
import * as TypeGraphQL from "type-graphql";
import { PayrollReportResolver } from '../resolvers/PayrollReportResolver';
import Container from 'typedi';
import { PayrollLogResolver } from '../resolvers/PayrollLogResolver';
import { PayrollGroupResolver } from '../resolvers/PayrollGroupResolver';

TypeGraphQL.useContainer(Container);

export const getSchema = () => {
    return TypeGraphQL.buildSchema({
        resolvers: [
            PayrollReportResolver,
            PayrollLogResolver,
            PayrollGroupResolver
        ],
    });
}
