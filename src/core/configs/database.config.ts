import { get } from 'env-var';
import "dotenv/config";
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  autoLoadEntities: true,
  synchronize: get('DATABASE_SYNCHRONIZE').default('true').asBool(),
  host: get('DATABASE_HOST').required().asString(),
  port: get('DATABASE_PORT').required().asPortNumber(),
  database: get('DATABASE_NAME').required().asString(),
  username: get('DATABASE_USER').required().asString(),
  password: get('DATABASE_PASSWORD').required().asString(),
};
