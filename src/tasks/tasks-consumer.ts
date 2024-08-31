import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject } from '@nestjs/common';
import { Job } from 'bullmq';
import { ExtendedTaskCreationDto } from 'src/dtos';
import { TaskStatus } from 'src/entities/task.entity';
import { TasksService } from 'src/tasks/tasks.service';

@Processor('generate-report')
export class TasksConsumer extends WorkerHost {
  constructor(@Inject() private tasksService: TasksService) {
    super();
  }

  async process(job: Job<ExtendedTaskCreationDto>, token?: string): Promise<any> {
      await this.tasksService.updateStatus(job.id, TaskStatus.DONE)
  }
}
