import { IsArray, IsString } from 'class-validator';
import { TaskStatus } from './entities/task.entity';

export class TaskCreationDTO {
  @IsString()
  serviceName: string;

  @IsString()
  endpoint: string;

  @IsArray()
  columns: string[];
}

export class ExtendedTaskCreationDto extends TaskCreationDTO {
  id: string;
}

export class TaskStatusDTO {
  status?: TaskStatus;

  @IsString()
  document_id?: string;

  @IsString()
  url?: string;
}
