import { Inject } from "typedi";
import { RedisConnector } from "../connectors/RedisConnector";
import { Query, Arg, Int } from "type-graphql";
import { PayrollReport } from "../entity/PayrollReport";
import { PayrollSerializers } from "../lib/PayrollSerializers";

export class PayrollReportResolver {
    @Inject() private readonly redisConnector: RedisConnector;
    @Inject() private readonly payrollReportSerializer: PayrollSerializers;

    @Query(returns => [PayrollReport])
    async payrollReports() {
        const cached = await this.redisConnector.getAll(`${PayrollSerializers.cacheKeyPrefix}*`);
        const reports = Object.entries(cached).map(([key, value]) =>
            this.payrollReportSerializer.payrollReportFromKeyValue(key, value));
        return reports;
    }
}