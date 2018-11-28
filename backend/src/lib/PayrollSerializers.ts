import { PayrollLog } from "../entity/PayrollLog";
import { PayrollEntry } from "../entity/PayrollEntry";
import { PayrollReport } from "../entity/PayrollReport";
import { Service, Inject } from "typedi";
import './CsvParser';
import { CsvParser } from "./CsvParser";
import { PayrollLogEntry } from "../types/PayrollLogEntry";
import { PayrollGroup } from "../entity/PayrollGroup";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { keyBy } from "lodash";

@Service()
export class PayrollSerializers {
    static cacheKeyPrefix = 'PayrollReport:';
    @Inject() private readonly csvParser: CsvParser;
    @InjectRepository(PayrollGroup) private readonly payrollGroupRepo: Repository<PayrollGroup>;

    payrollReportFromKeyValue(key: string, value: string) {
        const split = key.replace(PayrollSerializers.cacheKeyPrefix, '').split('-');
        return {
            amountPaid: Number(value),
            employee: Number(split[0]),
            year: Number(split[1]),
            month: Number(split[2]),
            isFirstHalf: split[3] === 'A',
        };
    }

    async getPayrollGroups() {
        // we can add caching here if needed
        const groupsArray = await this.payrollGroupRepo.find();
        return keyBy(groupsArray, 'id');
    }

    async payrollLogToKeyValues(log: PayrollLog) {
        const payrollGroups = await this.getPayrollGroups();
        let map: { [index: string]: number } = {};
        for (const entry of log.entries!) {
            const year = entry.date.getFullYear();
            const month = entry.date.getMonth();
            const isFirstHalf = isFirstHalfOfMonth(entry.date);
            const key = `${PayrollSerializers.cacheKeyPrefix}${entry.employee}-${year}-${month}-${isFirstHalf ? 'A' : 'B'}`;

            const payrollGroup = payrollGroups[entry.payrollGroup!.id];

            if (!payrollGroup) throw new Error(`Can't find payroll group with id ${entry.payrollGroup!.id}`);

            map[key] = map[key] || 0;
            map[key] += entry.hoursWorked * payrollGroup.hourlyRate;
        }
        return map;
    }

    getDate(strDate: string) {
        const [day, month, year] = strDate.split('/');
        return new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
        );
    }

    csvLogToPayrollLog(csvString: string) {
        const { id, entries } = this.csvParser.fromString<PayrollLogEntry>(csvString);
        const numberId = Number(id);
        
        if (Number.isNaN(numberId)) throw new Error('Report id must be a number');

        let log = new PayrollLog();
        log.id = numberId;
        log.entries = entries.map((entry): PayrollEntry => {
            const payrollEntry = {
                date: this.getDate(entry['date']),
                employee: Number(entry['employee id']),
                hoursWorked: Number(entry['hours worked']),
                payrollLog: log,
                payrollGroup: new PayrollGroup(entry['job group'])
            };
            return payrollEntry;
        })

        return log;
    }

}

const isFirstHalfOfMonth = (date: Date) => date.getDate() <= 15;
