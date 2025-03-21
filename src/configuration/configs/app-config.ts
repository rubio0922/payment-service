import { registerAs } from '@nestjs/config';
import { z } from 'zod';
import * as dotenv from 'dotenv';

import { name } from '../../../package.json';
import { IAppConfig } from '../interfaces/app-config.interface';

dotenv.config();

const envSchema = z.object({
  API_PREFIX: z.string().default('/api'),
  API_VERSION: z.string().default('/v1'),
  SERVICE_NAME: z.string().default(name),
  HTTP_PORT: z.number().default(3000),
});

export const appConfig = registerAs(
  'app-config',
  (): IAppConfig => {
    const envVars = {
      API_PREFIX: process.env.API_PREFIX || '/api',
      API_VERSION: process.env.API_VERSION || '/v1',
      SERVICE_NAME: process.env.SERVICE_NAME || name,
      HTTP_PORT: process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT, 10) : 3000,
    };

    return envSchema.parse(envVars);
  },
);