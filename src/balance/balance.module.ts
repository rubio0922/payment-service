import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/balance.entity';
import { UsersController } from './users.controller';
import { BalanceProvider } from './balance.provider';
import { BalanceService } from './balance.service';

@Module({
  exports: [BalanceService],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [BalanceService, BalanceProvider],
  controllers: [UsersController],
})
export class UsersModule {}
