import { Migration } from '@mikro-orm/migrations';

export class Migration20240902002946 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "tasks" add column "document_url" varchar(255) null;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "tasks" drop column "document_url";');
  }

}
