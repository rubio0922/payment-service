import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { BalanceService } from '../balance/balance.service';
import { Balance } from '../balance/entities/balance.entity';

@Injectable()
export class BalanceApiService {
  private readonly logger: LoggerService = new Logger(BalanceApiService.name);

  constructor(
    private readonly balanceService: BalanceService,
  ) {}

  async createUserBalance(balance: Balance) {
    await this.balanceService.create(balance)
  }
}
