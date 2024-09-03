import { IsArray, IsString } from 'class-validator';
import { TaskStatus } from './entities/task.entity';

/**
 * DTO that represents object for creation a task
 */
export class TaskCreationDTO {
  @IsString()
  serviceName: string;

  @IsString()
  endpoint: string;

  @IsArray()
  columns: string[];
}

/**
 * Extended task creation object with task UUID
 */
export class ExtendedTaskCreationDto extends TaskCreationDTO {
  id: string;
}

/**
 * DTO that represents task status
 */
export class TaskStatusDTO {
  status?: TaskStatus;

  @IsString()
  document_id?: string;

  @IsString()
  url?: string;
}
