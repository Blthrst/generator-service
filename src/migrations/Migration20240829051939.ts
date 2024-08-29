import { Migration } from '@mikro-orm/migrations';

export class Migration20240829051939 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "tasks" ("id" uuid not null, "document_name" varchar(255) not null, "status" text check ("status" in (\'DONE\', \'PENDING\', \'FAILURE\')) not null, constraint "tasks_pkey" primary key ("id"));');
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "tasks" cascade;');
  }

}
