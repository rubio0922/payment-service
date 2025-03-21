import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { registerFastifyOtelPlugin } from './uttils';
import { ConfigType } from '@nestjs/config';
import { appConfig } from './configuraion/configs/app-config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: new Logger() }
  );

  const { API_PREFIX, API_VERSION, HTTP_PORT } = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

  app.setGlobalPrefix(`${API_PREFIX}${API_VERSION}`);

  const fastifyInstance = app.getHttpAdapter().getInstance();

  await registerFastifyOtelPlugin(fastifyInstance); 

  app.use(helmet());

  await app.listen(HTTP_PORT);
}
bootstrap();
