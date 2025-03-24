import { Injectable, Logger, LoggerService, NotFoundException } from '@nestjs/common';
import { v7 as uuidv7 } from 'uuid';

import { BalanceProvider } from './balance.provider';
import { Balance } from './entities/balance.entity';

@Injectable()
export class BalanceService {
  private readonly logger: LoggerService = new Logger(BalanceService.name);

  constructor(
    private readonly balanceProvider: BalanceProvider,
  ) {}

    async create(balance: Balance) {
      this.logger.log(`Creating balance: ${JSON.stringify(balance)}`);

      await this.isExist(balance.id);

      const id = uuidv7();

      await this.balanceProvider.create({...balance, id });

      this.logger.log(`Balance created successfully`);
    }
  
    async findAll(limit: number = 10, offset: number = 0): Promise<Balance[]> {
      this.logger.log('Finding all balances');

      const balances = await this.balanceProvider.findAll(limit, offset);

      this.logger.log(`Found ${balances.length} balances`);

      return balances;
    }
  
    async findOne(id: string): Promise<Balance> {
      this.logger.log(`Finding balance with id: ${id}`);

      const balance = await this.balanceProvider.findOne(id);

      if(!balance) {
        throw new NotFoundException(`No balance with id - ${id}`)
      }

      return balance;
    }

    async isExist(id: string): Promise<void> {
      this.logger.log(`Checking if balance with id: ${id} exists`);

      const isExist = this.balanceProvider.isExist(id);

      if(!isExist) {
        throw new NotFoundException(`No balance with id - ${id}`);
      }
    }
  
    async update(id: string, balance: Balance): Promise<void> {
      this.logger.log(`Updating balance with id: ${id}`);

      await this.isExist(id);

      await this.balanceProvider.update(id , balance);

      this.logger.log(`Balance updated successfully`);
    }
  
    async remove(id: string): Promise<void> {
      this.logger.log(`Removing balance with id: ${id}`);

      await this.isExist(id);

      await this.balanceProvider.remove(id );

      this.logger.log(`Balance removed successfully`);
    }
}
