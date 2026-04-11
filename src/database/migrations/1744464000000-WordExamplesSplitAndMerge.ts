import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Переносит exampleText + tale из words в word_examples,
 * сливает дубликаты слов (одинаковые word + wordWithAccent + description),
 * удаляет лишние строки words и колонки taleId/exampleText.
 *
 * Перед запуском отключите synchronize (DATABASE_SYNCHRONIZE=false) или остановите приложение,
 * чтобы TypeORM не менял схему параллельно с миграцией.
 *
 * Откат (down) восстанавливает по одному примеру на слово; дубликаты слов после merge не восстанавливаются.
 */
export class WordExamplesSplitAndMerge1744464000000 implements MigrationInterface {
  name = 'WordExamplesSplitAndMerge1744464000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "word_examples" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "exampleText" text NOT NULL,
        "wordId" uuid NOT NULL,
        "taleId" uuid NOT NULL,
        CONSTRAINT "PK_word_examples" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_word_examples_wordId" ON "word_examples" ("wordId")
    `);

    await queryRunner.query(`
      ALTER TABLE "word_examples"
      ADD CONSTRAINT "FK_word_examples_wordId"
      FOREIGN KEY ("wordId") REFERENCES "words"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "word_examples"
      ADD CONSTRAINT "FK_word_examples_taleId"
      FOREIGN KEY ("taleId") REFERENCES "tales"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      INSERT INTO "word_examples" ("id", "exampleText", "wordId", "taleId")
      SELECT gen_random_uuid(), w."exampleText", w.id, w."taleId"
      FROM "words" w
    `);

    await queryRunner.query(`
      WITH groups AS (
        SELECT
          id,
          MIN(id) OVER (
            PARTITION BY word, COALESCE("wordWithAccent", ''), description
          ) AS canonical_id
        FROM "words"
      )
      UPDATE "word_examples" we
      SET "wordId" = g.canonical_id
      FROM groups g
      WHERE we."wordId" = g.id
    `);

    await queryRunner.query(`
      DELETE FROM "word_examples" a
      USING "word_examples" b
      WHERE a."wordId" = b."wordId"
        AND a."taleId" = b."taleId"
        AND a."exampleText" = b."exampleText"
        AND a.id > b.id
    `);

    await queryRunner.query(`
      DELETE FROM "words" w
      WHERE NOT EXISTS (
        SELECT 1 FROM "word_examples" we WHERE we."wordId" = w.id
      )
    `);

    const fkRows: { constraint_name: string }[] = await queryRunner.query(`
      SELECT tc.constraint_name AS constraint_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
      WHERE tc.table_schema = 'public'
        AND tc.table_name = 'words'
        AND tc.constraint_type = 'FOREIGN KEY'
        AND kcu.column_name = 'taleId'
    `);

    for (const row of fkRows) {
      await queryRunner.query(
        `ALTER TABLE "words" DROP CONSTRAINT "${row.constraint_name}"`,
      );
    }

    await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "exampleText"`);
    await queryRunner.query(`ALTER TABLE "words" DROP COLUMN "taleId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "words" ADD "exampleText" text`);
    await queryRunner.query(`ALTER TABLE "words" ADD "taleId" uuid`);

    await queryRunner.query(`
      UPDATE "words" w
      SET
        "exampleText" = sub."exampleText",
        "taleId" = sub."taleId"
      FROM (
        SELECT DISTINCT ON ("wordId") "wordId", "exampleText", "taleId"
        FROM "word_examples"
        ORDER BY "wordId", "id"
      ) sub
      WHERE w.id = sub."wordId"
    `);

    await queryRunner.query(`
      ALTER TABLE "words" ALTER COLUMN "exampleText" SET NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "words" ALTER COLUMN "taleId" SET NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "words"
      ADD CONSTRAINT "FK_words_taleId_revert"
      FOREIGN KEY ("taleId") REFERENCES "tales"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    await queryRunner.query(`DROP TABLE "word_examples"`);
  }
}
