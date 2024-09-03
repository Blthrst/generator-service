import { PrimaryKey, Property, Entity, Enum } from '@mikro-orm/core';
import { randomUUID } from 'crypto';

/**
 * Enumeration that represents task's status
 */
export enum TaskStatus {
    DONE = "DONE",
    PENDING = "PENDING",
    FAILURE = "FAILURE"
}

/**
 * Entity that represents a task
 */
@Entity({ tableName: 'tasks' })
export class TaskEntity {
  /**
   * Task's UUID
   */
  @PrimaryKey({ type: 'uuid' })
  id: string = randomUUID();

  /**
   * Document location
   */
  @Property({type: "varchar", fieldName: 'document_url', nullable: true})
  documentUrl: string

  /**
   * Task's status
   */
  @Enum(() => TaskStatus)
  status: TaskStatus;
}
