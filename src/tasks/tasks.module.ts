import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BullModule } from '@nestjs/bullmq';

import { TasksService } from './tasks.service';
import { TaskEntity } from 'src/entities/task.entity';
import { TasksQueueService } from './tasks-queue.service';
import { TasksController } from './tasks.contoller';
import { TasksConsumer } from './tasks-consumer';

@Module({
  imports: [
    MikroOrmModule.forFeature([TaskEntity]),
    BullModule.registerQueue({
      name: 'tasks',
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksQueueService, TasksConsumer],
})
export class TasksModule {}
