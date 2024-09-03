import { Controller, Get, Query, Post, Body, Inject } from '@nestjs/common';
import { TasksQueueService } from 'src/tasks/tasks-queue.service';
import { TaskCreationDTO, TaskStatusDTO } from 'src/dtos';
import { TasksService } from './tasks.service';

/**
 * Controller that handles requests to `/tasks` endpoint
 */
@Controller('tasks')
export class TasksController {
  constructor(
    @Inject()
    private tasksService: TasksService,
    @Inject()
    private tasksQueueService: TasksQueueService,
  ) {}

  /**
   * Gets status of task with specified UUID
   * @param id Task's UUID
   * @returns Task's status
   */
  @Get()
  async getStatus(@Query('id') id: string): Promise<TaskStatusDTO> {
    return this.tasksService.getStatus(id);
  }

  /**
   * Creates new task for generating report
   * @param task Task object
   * @returns Task's status
   */
  @Post('new')
  async createTask(@Body() task: TaskCreationDTO): Promise<TaskStatusDTO> {
    return this.tasksQueueService.addTaskToQueue(task);
  }
}
