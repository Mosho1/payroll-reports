import { Query, Arg, Int, Resolver, ClassType } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { PayrollGroup } from '../entity/PayrollGroup';

@Resolver(of => PayrollGroup)
export class PayrollGroupResolver {
    @InjectRepository(PayrollGroup) protected readonly payrollGroupRepo: Repository<PayrollGroup>

    @Query(returns => PayrollGroup, { nullable: true })
    payrollGroup(@Arg('id', type => Int) id: number) {
        return this.payrollGroupRepo.findOne(id);
    }

    @Query(returns => [PayrollGroup])
    payrollGroups() {
        return this.payrollGroupRepo.find();
    }
}
