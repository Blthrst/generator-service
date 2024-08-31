import { Migration } from '@mikro-orm/migrations';

export class Migration20240831025157 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "tasks" drop column "document_name";');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "tasks" add column "document_name" varchar(255) not null;');
  }

}
