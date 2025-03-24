import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { appConfig } from './configuration/configs/app-config';
import { postgresConfig } from './configuration/configs/postgres-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceModule } from './balance/balance.module';
import { RequestIdMiddleware } from './utils/requestId.middleware';
import { BalanceApiModule } from './api/balance-api.module';

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
    BalanceApiModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}