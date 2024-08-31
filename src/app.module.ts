import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';

import { TasksModule } from './tasks/tasks.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
