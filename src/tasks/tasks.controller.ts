import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskCreationDTO } from 'src/dtos';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    async getStatus(@Query('id') id: string) {
        //todo
    }

    @Post()
    async createTask(@Body() body: TaskCreationDTO) {
        //todo
    }
}
