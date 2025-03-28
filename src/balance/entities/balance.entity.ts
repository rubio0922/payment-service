import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { bigintTransformer } from '../../utils/orm.utils';
import { IBalance } from '../interfaces/balance.interface';

@Entity('balance')
export class Balance implements IBalance {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false })
  amount: number;

  @Column({
    unique: true,
    type: 'bigint',
    transformer: bigintTransformer,
    nullable: false,
  })
  userId: number;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date;
}
