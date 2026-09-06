import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages" ADD COLUMN "title" varchar;
    UPDATE "pages"
    SET "title" = "pages_locales"."title"
    FROM "pages_locales"
    WHERE "pages_locales"."_parent_id" = "pages"."id"
      AND "pages_locales"."_locale" = 'en';

    ALTER TABLE "_pages_v" ADD COLUMN "version_title" varchar;
    UPDATE "_pages_v"
    SET "version_title" = "_pages_v_locales"."version_title"
    FROM "_pages_v_locales"
    WHERE "_pages_v_locales"."_parent_id" = "_pages_v"."id"
      AND "_pages_v_locales"."_locale" = 'en';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "_pages_v" DROP COLUMN "version_title";
    ALTER TABLE "pages" DROP COLUMN "title";
  `)
}
