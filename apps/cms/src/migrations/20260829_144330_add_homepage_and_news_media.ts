import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage" ADD COLUMN "hero_media_id" integer;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_hero_media_id" integer;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "homepage_hero_media_idx" ON "homepage" USING btree ("hero_media_id");
  CREATE INDEX "_homepage_v_version_version_hero_media_idx" ON "_homepage_v" USING btree ("version_hero_media_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage" DROP CONSTRAINT "homepage_hero_media_id_media_id_fk";
  
  ALTER TABLE "_homepage_v" DROP CONSTRAINT "_homepage_v_version_hero_media_id_media_id_fk";
  
  DROP INDEX "homepage_hero_media_idx";
  DROP INDEX "_homepage_v_version_version_hero_media_idx";
  ALTER TABLE "homepage" DROP COLUMN "hero_media_id";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_hero_media_id";`)
}
