import { registerAs } from '@nestjs/config';
import { z } from 'zod';
import * as dotenv from 'dotenv';

import { name } from '../../../package.json';
import { IAppConfig } from '../interfaces/app-config.interface';
import { parseToInt } from '../../utils/parseToInt';

dotenv.config();

const envSchema = z.object({
  API_PREFIX: z.string().default('/api'),
  API_VERSION: z.string().default('/v1'),
  SERVICE_NAME: z.string().default(name),
  HTTP_PORT: z.string().transform((val) => parseToInt(val)).default('3000'),
  AUTH_HEADER_SECRET: z.string(),
});

const env = envSchema.parse(process.env);

export const appConfig = registerAs(
  'app-config',
  (): IAppConfig => ({
    API_PREFIX: env.API_PREFIX || '/api',
    API_VERSION: env.API_VERSION || '/v1',
    SERVICE_NAME: env.SERVICE_NAME || name,
    HTTP_PORT: env.HTTP_PORT,
    AUTH_HEADER_SECRET: env.AUTH_HEADER_SECRET,
  }),
);