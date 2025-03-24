import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { BalanceModule } from '../balance/balance.module';
import { BalanceApiService } from './balance-api.service';
import { BalanceApiController } from './balance-api.controller';

@Module({
  providers: [BalanceApiService],
  imports: [BalanceModule],
  controllers: [BalanceApiController],
})
export class BalanceApiModule {}
