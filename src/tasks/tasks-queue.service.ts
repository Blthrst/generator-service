import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import {
  TaskCreationDTO,
  TaskStatusDTO,
} from 'src/dtos';
import { TasksService } from 'src/tasks/tasks.service';
import { TaskStatus } from 'src/entities/task.entity';

@Injectable()
export class TasksQueueService {
  constructor(
    @InjectQueue('tasks') private tasksQueue: Queue,
    @Inject() private tasksService: TasksService,
  ) {}

  async addTaskToQueue(task: TaskCreationDTO): Promise<TaskStatusDTO> {
    const newTask = await this.tasksService.create(TaskStatus.PENDING);
    const extendedTask = {
      ...task,
      id: newTask.id,
    };

    await this.tasksQueue.add('generate-report', extendedTask);
    await this.tasksQueue.getJobCounts().then(console.log);

    return { document_id: newTask.id };
  }
}
