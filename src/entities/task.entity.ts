import { PrimaryKey, Property, Entity, Enum } from '@mikro-orm/core';
import { randomUUID } from 'crypto';

export enum TaskStatus {
    DONE = "DONE",
    PENDING = "PENDING",
    FAILURE = "FAILURE"
}

@Entity({ tableName: 'tasks' })
export class TaskEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = randomUUID();

  @Property({type: "varchar", fieldName: 'document_url', nullable: true})
  documentUrl: string

  @Enum(() => TaskStatus)
  status: TaskStatus;
}
