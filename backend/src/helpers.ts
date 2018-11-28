import { getRepository, Column, ColumnOptions } from "typeorm";
import { PayrollGroup } from "./entity/PayrollGroup";

export const seedDatabase = () => {
    const payrollGroupRepo = getRepository(PayrollGroup);

    return payrollGroupRepo.save<PayrollGroup>([
        { entries: [], hourlyRate: 20, id: 'A' },
        { entries: [], hourlyRate: 30, id: 'B' }
    ]);
}