import { registerAs } from '@nestjs/config';
import { envValidation } from '@sibd/backend-tools';


import * as name from '../../../package.json';
import { IAppConfig } from '../interfaces/app-config.interface';

const { env } = envValidation;

export const appConfig = registerAs(
  'app-config',
  (): IAppConfig => ({
    API_PREFIX: env.get('API_PREFIX').default('/api').validatedValue,
    API_VERSION: env.get('API_VERSION').default('/v1').validatedValue,
    SERVICE_NAME: env.get('SERVICE_NAME').default(name).validatedValue,
    HTTP_PORT: env.get('HTTP_PORT').port().default(3000).validatedValue,
    AUTH_HEADER_SECRET: env.get('AUTH_HEADER_SECRET').required().validatedValue,
  }),
);
