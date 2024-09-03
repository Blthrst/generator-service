import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { join } from 'path';
import "dotenv/config"

/**
 * Mikro-Orm configuration object
 */
const config: Options = {
  allowGlobalContext: true,
  driver: PostgreSqlDriver,
  dbName: process.env.MIKRO_ORM_NAME,
  user: process.env.MIKRO_ORM_USER,
  host: process.env.MIKRO_ORM_HOST,
  port: Number(process.env.MIKRO_ORM_PORT),
  password: process.env.MIKRO_ORM_PWD,
  entities: [join(process.cwd(), 'dist', 'entities', '**.entity.js')],
  entitiesTs: [join(process.cwd(), 'src', 'entities', '**.entity.ts')],
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator],
  migrations: {
    path: join(process.cwd(), 'dist', 'migrations'),
    pathTs: join(process.cwd(), 'src', 'migrations'),
  },
};

export default config;
