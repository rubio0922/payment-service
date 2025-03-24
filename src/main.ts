import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigType } from '@nestjs/config';
import { appConfig } from './configuration/configs/app-config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  const { API_PREFIX, API_VERSION, HTTP_PORT } = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

  app.setGlobalPrefix(`${API_PREFIX}${API_VERSION}`);

  app.use(helmet());

  await app.listen(HTTP_PORT);
}
bootstrap();
