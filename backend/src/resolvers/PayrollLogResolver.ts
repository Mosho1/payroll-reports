import { Resolver, Arg, Mutation, Root, FieldResolver, Query, Int } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { PayrollLog } from "../entity/PayrollLog";
import { Repository } from "typeorm";
import { PayrollEntry } from "../entity/PayrollEntry";
import { PayrollSerializers } from "../lib/PayrollSerializers";
import { Inject } from "typedi";
import "../connectors/RedisConnector";
import { RedisConnector } from "../connectors/RedisConnector";

@Resolver(of => PayrollLog)
export class PayrollLogResolver {
    @InjectRepository(PayrollEntry) private readonly payrollEntryRepo: Repository<PayrollEntry>;
    @Inject() private readonly redisConnector: RedisConnector;
    @Inject() private readonly payrollReportSerializer: PayrollSerializers;

    @InjectRepository(PayrollLog) protected readonly payrollLogRepo: Repository<PayrollLog>

    @Query(returns => PayrollLog, { nullable: true })
    payrollLog(@Arg('id', type => Int) id: number) {
        return this.payrollLogRepo.findOne(id);
    }

    @Query(returns => [PayrollLog])
    payrollLogs() {
        return this.payrollLogRepo.find();
    }

    async cacheReportsFromLog(log: PayrollLog) {
        const reportsMap = await this.payrollReportSerializer.payrollLogToKeyValues(log);
        return Promise.all(Object.entries(reportsMap).map(async ([key, value]) => {
            const existing = await this.redisConnector.get(key);
            const currentValue = existing ? Number(existing) : 0;
            const newValue = value + currentValue;
            await this.redisConnector.set(key, JSON.stringify(newValue));
        }));
    }

    @Mutation(returns => PayrollLog)
    async addPayrollLog(@Arg("logCsvString") logCsvString: string): Promise<PayrollLog> {
        const log = await this.payrollReportSerializer.csvLogToPayrollLog(logCsvString);
        const possiblyExisting = await this.payrollLogRepo.findOne({id: log.id});
        if (possiblyExisting) {
            throw new Error(`Log with id ${log.id} already exists`);
        }
        await this.payrollLogRepo.save(log);
        await this.cacheReportsFromLog(log);
        return log;
    }

    @FieldResolver()
    entries(@Root() payrollLog: PayrollLog) {
        return this.payrollEntryRepo.find({
            where: { payrollLog }
        });
    }

}