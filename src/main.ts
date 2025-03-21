import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { registerFastifyOtelPlugin } from './uttils';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: new Logger() }
  );

  app.setGlobalPrefix('api/v1');

  const fastifyInstance = app.getHttpAdapter().getInstance();

  await registerFastifyOtelPlugin(fastifyInstance); 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
