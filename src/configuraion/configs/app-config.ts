import { registerAs } from '@nestjs/config';
import { z } from 'zod';
import * as env from 'env-var';

import * as packageJson from '../../../package.json';
import { IAppConfig } from '../interfaces/app-config.interface';

const envSchema = z.object({
  API_PREFIX: z.string().default('/api'),
  API_VERSION: z.string().default('/v1'),
  SERVICE_NAME: z.string().default(packageJson.name),
  HTTP_PORT: z.number().default(3000),
});

export const appConfig = registerAs(
  'app-config',
  (): IAppConfig => {
    const envVars = {
      API_PREFIX: env.get('API_PREFIX').default('/api').asString(),
      API_VERSION: env.get('API_VERSION').default('/v1').asString(),
      SERVICE_NAME: env.get('SERVICE_NAME').default(packageJson.name).asString(),
      HTTP_PORT: env.get('HTTP_PORT').default(3000).asPortNumber(),
    };

    return envSchema.parse(envVars);
  },
);
