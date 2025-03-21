import { registerAs } from '@nestjs/config';
import { z } from 'zod';
import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { IPostgresConfig } from '../interfaces/postgres-config.interface';
import { parseToInt } from '../../utils/parseToInt';

dotenv.config();

const envSchema = z.object({
  DB_TYPE: z.string().default('postgres'),
  DB_HOST: z.string(),
  DB_PORT: z.string().transform((val) => parseToInt(val)).default('5432'),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  DB_AUTO_LOAD_ENTITIES: z.string().transform((val) => val === 'true').default('true'),
  DB_SYNCHRONIZE: z.string().transform((val) => val === 'true').default('false'),
});

const env = envSchema.parse(process.env);

export const postgresConfig = registerAs(
  'postgres-config',
  (): IPostgresConfig => ({
    type: 'postgres',
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    autoLoadEntities: env.DB_AUTO_LOAD_ENTITIES,
    synchronize: env.DB_SYNCHRONIZE,
    namingStrategy: new SnakeNamingStrategy(),
  }),
);
