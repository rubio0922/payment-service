import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export interface IPostgresConfig {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  autoLoadEntities: boolean;
  synchronize: boolean;
  namingStrategy: SnakeNamingStrategy;
}
