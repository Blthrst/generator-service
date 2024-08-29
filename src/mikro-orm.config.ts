import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import path from 'path';

const config: Options = {
  allowGlobalContext: true,
  driver: PostgreSqlDriver,
  dbName: process.env.MIKRO_ORM_NAME,
  user: process.env.MIKRO_ORM_USER,
  host: process.env.MIKRO_ORM_HOST,
  port: Number(process.env.MIKRO_ORM_PORT),
  password: process.env.MIKRO_ORM_PWD,
  entities: [path.join(process.cwd(), 'dist', 'entities', '**.entity.js')],
  entitiesTs: [path.join(process.cwd(), 'src', 'entities', '**.entity.ts')],
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator],
  migrations: {
    path: path.join(process.cwd(), 'dist', 'migrations'),
    pathTs: path.join(process.cwd(), 'src', 'migrations'),
  },
};

export default config;
