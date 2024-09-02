import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TaskStatusDTO } from 'src/dtos';
import { TaskEntity, TaskStatus } from 'src/entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: EntityRepository<TaskEntity>,
    private configService: ConfigService,
  ) {}

  async create(status: TaskStatus): Promise<TaskEntity> {
    const task = this.tasksRepository.create({ status });

    const id = await this.tasksRepository.insert(task);

    const found = await this.findById(id);
    return found;
  }

  async findById(id: string): Promise<TaskEntity> {
    const task = await this.tasksRepository.findOne({ id });

    if (!task) throw new NotFoundException();

    return task;
  }

  async getStatus(id: string): Promise<TaskStatusDTO> {
    const task = await this.findById(id);

    if (
      task.status === TaskStatus.PENDING ||
      task.status === TaskStatus.FAILURE
    ) {
      return { status: task.status };
    }

    return {
      status: task.status,
      url: `${this.configService.get('BASE_URL')}/downloads/${task.id}`,
    };
  }

  async updateStatusAndUrl(
    id: string,
    status: TaskStatus,
    documentUrl: string,
  ): Promise<void> {
    await this.tasksRepository.upsert({ id, status, documentUrl });
  }
}
