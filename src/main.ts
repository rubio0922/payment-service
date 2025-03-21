import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { registerFastifyOtelPlugin } from './utils/otel';
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

  const fastifyInstance = app.getHttpAdapter().getInstance();

  await registerFastifyOtelPlugin(fastifyInstance);

  app.use(helmet());

  await app.listen(HTTP_PORT);
}
bootstrap();
