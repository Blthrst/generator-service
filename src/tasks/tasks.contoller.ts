import { Controller, Get, Query, Post, Body, Inject } from '@nestjs/common';
import { TasksQueueService } from 'src/tasks/tasks-queue.service';
import { TaskCreationDTO, TaskStatusDTO } from 'src/dtos';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject()
    private tasksService: TasksService,
    @Inject()
    private tasksQueueService: TasksQueueService,
  ) {}

  @Get()
  async getStatus(@Query('id') id: string): Promise<TaskStatusDTO> {
    return this.tasksService.getStatus(id);
  }

  @Post('new')
  async createTask(@Body() task: TaskCreationDTO): Promise<TaskStatusDTO> {
    return this.tasksQueueService.addTaskToQueue(task);
  }
}
