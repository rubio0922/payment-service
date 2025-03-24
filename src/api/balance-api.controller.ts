import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { BalanceApiService } from './balance-api.service';
import { Balance } from '../balance/entities/balance.entity';

@UseGuards(AuthGuard)
@Controller('balance')
export class BalanceApiController {
  constructor(private readonly balanceApiService: BalanceApiService) {}

  @Post()
  async createUserBalance(@Body() balance: Balance): Promise<void> {
    return await this.balanceApiService.createUserBalance(balance);
  }
}
