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

  /**
   * Creates new task
   * @param status Init task status
   * @returns `TaskEntity` 
   */
  async create(status: TaskStatus): Promise<TaskEntity> {
    const task = this.tasksRepository.create({ status });

    const id = await this.tasksRepository.insert(task);

    const found = await this.findById(id);
    return found;
  }

  /**
   * Finds task with specified UUID. If not found throws `NotFoundException`
   * @param id Task's UUID
   * @returns `TaskEntity`
   */
  async findById(id: string): Promise<TaskEntity> {
    const task = await this.tasksRepository.findOne({ id });

    if (!task) throw new NotFoundException();

    return task;
  }

  /**
   * Gets task status with specified UUID
   * @param id Task's UUID
   * @returns Task's status
   */
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

  /**
   * Updates task's status and writes generated report's path (`documentUrl`)
   * @param id Task's UUID
   * @param status Task's status
   * @param documentUrl Path to generated report
   */
  async updateStatusAndUrl(
    id: string,
    status: TaskStatus,
    documentUrl: string,
  ): Promise<void> {
    await this.tasksRepository.upsert({ id, status, documentUrl });
  }
}
