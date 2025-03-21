import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BalanceProvider } from './balance.provider';
import { BalanceService } from './balance.service';
import { Balance } from './entities/balance.entity';

@Module({
  exports: [BalanceService],
  imports: [TypeOrmModule.forFeature([Balance])],
  providers: [BalanceService, BalanceProvider],
})
export class BalanceModule {}
