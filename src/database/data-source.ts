import 'dotenv/config';
import { DataSource } from 'typeorm';
import { get } from 'env-var';
import { Word } from '../app/words/entities/word.entity';
import { WordExample } from '../app/words/entities/word-example.entity';
import { Tale } from '../app/tales/entities/tale.entity';
import { TaleImage } from '../app/tale-images/entities/tale-image.entity';

export default new DataSource({
  type: 'postgres',
  host: get('DATABASE_HOST').required().asString(),
  port: get('DATABASE_PORT').required().asPortNumber(),
  database: get('DATABASE_NAME').required().asString(),
  username: get('DATABASE_USER').required().asString(),
  password: get('DATABASE_PASSWORD').required().asString(),
  entities: [Word, WordExample, Tale, TaleImage],
  migrations: ['dist/database/migrations/*.js'],
  migrationsTableName: 'typeorm_migrations',
});
