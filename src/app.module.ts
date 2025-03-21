import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { appConfig } from './configuration/configs/app-config';
import { postgresConfig } from './configuration/configs/postgres-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceModule } from './balance/balance.module';
// import { LoggerMiddleware } from './utils/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, postgresConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (postgresConfigToken: ConfigType<typeof postgresConfig>) => ({
        ...postgresConfigToken,
      }),
      inject: [postgresConfig.KEY],
    }),
    BalanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  })
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggerMiddleware)
  //     .forRoutes({ path: '*', method: RequestMethod.ALL });
  // }
}
