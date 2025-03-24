import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { Balance } from './entities/balance.entity';


@Injectable()
export class BalanceProvider {
  constructor(
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>,
  ) {}
  async create(balance: Balance): Promise<InsertResult> {
    return this.balanceRepository.insert(balance);
  }

  async findAll(limit: number, offset: number): Promise<Balance[]> {
    return this.balanceRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string): Promise<Balance | null> {
    return this.balanceRepository.findOneBy({ id});
  }

  async isExist(id: string): Promise<boolean> {
    return this.balanceRepository.existsBy({ id });
  }

  async update(id: string, balance: Balance): Promise<void> {
    await this.balanceRepository.update({ id }, balance);
  }

  async remove(id: string): Promise<void> {
    await this.balanceRepository.delete({ id });
  }
}
