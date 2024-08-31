import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatusDTO } from 'src/dtos';
import { TaskEntity, TaskStatus } from 'src/entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: EntityRepository<TaskEntity>,
  ) {}

  async create(status: TaskStatus): Promise<TaskEntity> {
    const task = this.tasksRepository.create({ status });

    const id = await this.tasksRepository.insert(task);

    const found = await this.findById(id);
    return found;
  }

  async findById(id: string): Promise<TaskEntity> {
    const task = await this.tasksRepository.findOne({ id });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async getStatus(id: string): Promise<TaskStatusDTO> {
    const task = await this.findById(id);

    return { status: task.status };
  }

  async updateStatus(id: string, status: TaskStatus): Promise<void> {
    await this.tasksRepository.upsert({id, status})
  }
}
