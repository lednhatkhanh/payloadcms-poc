import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "seo_settings" (
      "id" serial PRIMARY KEY NOT NULL,
      "site_name" varchar NOT NULL,
      "default_social_image_id" integer,
      "twitter_site" varchar,
      "google_site_verification" varchar,
      "allow_indexing" boolean DEFAULT true NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now(),
      "created_at" timestamp(3) with time zone DEFAULT now()
    );

    CREATE TABLE "seo_settings_locales" (
      "default_title" varchar NOT NULL,
      "default_description" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    ALTER TABLE "news_locales"
      ADD COLUMN "meta_title" varchar,
      ADD COLUMN "meta_description" varchar,
      ADD COLUMN "meta_image_id" integer;
    ALTER TABLE "_news_v_locales"
      ADD COLUMN "version_meta_title" varchar,
      ADD COLUMN "version_meta_description" varchar,
      ADD COLUMN "version_meta_image_id" integer;
    ALTER TABLE "locations_locales"
      ADD COLUMN "meta_title" varchar,
      ADD COLUMN "meta_description" varchar,
      ADD COLUMN "meta_image_id" integer;
    ALTER TABLE "_locations_v_locales"
      ADD COLUMN "version_meta_title" varchar,
      ADD COLUMN "version_meta_description" varchar,
      ADD COLUMN "version_meta_image_id" integer;
    ALTER TABLE "pages_locales"
      ADD COLUMN "meta_title" varchar,
      ADD COLUMN "meta_description" varchar,
      ADD COLUMN "meta_image_id" integer;
    ALTER TABLE "_pages_v_locales"
      ADD COLUMN "version_meta_title" varchar,
      ADD COLUMN "version_meta_description" varchar,
      ADD COLUMN "version_meta_image_id" integer;
    ALTER TABLE "homepage_locales"
      ADD COLUMN "meta_title" varchar,
      ADD COLUMN "meta_description" varchar,
      ADD COLUMN "meta_image_id" integer;
    ALTER TABLE "_homepage_v_locales"
      ADD COLUMN "version_meta_title" varchar,
      ADD COLUMN "version_meta_description" varchar,
      ADD COLUMN "version_meta_image_id" integer;

    ALTER TABLE "seo_settings" ADD CONSTRAINT "seo_settings_default_social_image_id_media_id_fk" FOREIGN KEY ("default_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "seo_settings_locales" ADD CONSTRAINT "seo_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_news_v_locales" ADD CONSTRAINT "_news_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "locations_locales" ADD CONSTRAINT "locations_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_locations_v_locales" ADD CONSTRAINT "_locations_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "homepage_locales" ADD CONSTRAINT "homepage_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_homepage_v_locales" ADD CONSTRAINT "_homepage_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    CREATE INDEX "seo_settings_default_social_image_idx" ON "seo_settings" USING btree ("default_social_image_id");
    CREATE UNIQUE INDEX "seo_settings_locales_locale_parent_id_unique" ON "seo_settings_locales" USING btree ("_locale", "_parent_id");
    CREATE INDEX "news_locales_meta_image_idx" ON "news_locales" USING btree ("meta_image_id");
    CREATE INDEX "_news_v_locales_version_meta_image_idx" ON "_news_v_locales" USING btree ("version_meta_image_id");
    CREATE INDEX "locations_locales_meta_image_idx" ON "locations_locales" USING btree ("meta_image_id");
    CREATE INDEX "_locations_v_locales_version_meta_image_idx" ON "_locations_v_locales" USING btree ("version_meta_image_id");
    CREATE INDEX "pages_locales_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id");
    CREATE INDEX "_pages_v_locales_version_meta_image_idx" ON "_pages_v_locales" USING btree ("version_meta_image_id");
    CREATE INDEX "homepage_locales_meta_image_idx" ON "homepage_locales" USING btree ("meta_image_id");
    CREATE INDEX "_homepage_v_locales_version_meta_image_idx" ON "_homepage_v_locales" USING btree ("version_meta_image_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX "_homepage_v_locales_version_meta_image_idx";
    DROP INDEX "homepage_locales_meta_image_idx";
    DROP INDEX "_pages_v_locales_version_meta_image_idx";
    DROP INDEX "pages_locales_meta_image_idx";
    DROP INDEX "_locations_v_locales_version_meta_image_idx";
    DROP INDEX "locations_locales_meta_image_idx";
    DROP INDEX "_news_v_locales_version_meta_image_idx";
    DROP INDEX "news_locales_meta_image_idx";
    DROP INDEX "seo_settings_locales_locale_parent_id_unique";
    DROP INDEX "seo_settings_default_social_image_idx";

    ALTER TABLE "_homepage_v_locales" DROP CONSTRAINT "_homepage_v_locales_version_meta_image_id_media_id_fk";
    ALTER TABLE "homepage_locales" DROP CONSTRAINT "homepage_locales_meta_image_id_media_id_fk";
    ALTER TABLE "_pages_v_locales" DROP CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk";
    ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_meta_image_id_media_id_fk";
    ALTER TABLE "_locations_v_locales" DROP CONSTRAINT "_locations_v_locales_version_meta_image_id_media_id_fk";
    ALTER TABLE "locations_locales" DROP CONSTRAINT "locations_locales_meta_image_id_media_id_fk";
    ALTER TABLE "_news_v_locales" DROP CONSTRAINT "_news_v_locales_version_meta_image_id_media_id_fk";
    ALTER TABLE "news_locales" DROP CONSTRAINT "news_locales_meta_image_id_media_id_fk";
    ALTER TABLE "seo_settings_locales" DROP CONSTRAINT "seo_settings_locales_parent_id_fk";
    ALTER TABLE "seo_settings" DROP CONSTRAINT "seo_settings_default_social_image_id_media_id_fk";

    ALTER TABLE "_homepage_v_locales" DROP COLUMN "version_meta_image_id", DROP COLUMN "version_meta_description", DROP COLUMN "version_meta_title";
    ALTER TABLE "homepage_locales" DROP COLUMN "meta_image_id", DROP COLUMN "meta_description", DROP COLUMN "meta_title";
    ALTER TABLE "_pages_v_locales" DROP COLUMN "version_meta_image_id", DROP COLUMN "version_meta_description", DROP COLUMN "version_meta_title";
    ALTER TABLE "pages_locales" DROP COLUMN "meta_image_id", DROP COLUMN "meta_description", DROP COLUMN "meta_title";
    ALTER TABLE "_locations_v_locales" DROP COLUMN "version_meta_image_id", DROP COLUMN "version_meta_description", DROP COLUMN "version_meta_title";
    ALTER TABLE "locations_locales" DROP COLUMN "meta_image_id", DROP COLUMN "meta_description", DROP COLUMN "meta_title";
    ALTER TABLE "_news_v_locales" DROP COLUMN "version_meta_image_id", DROP COLUMN "version_meta_description", DROP COLUMN "version_meta_title";
    ALTER TABLE "news_locales" DROP COLUMN "meta_image_id", DROP COLUMN "meta_description", DROP COLUMN "meta_title";
    DROP TABLE "seo_settings_locales";
    DROP TABLE "seo_settings";
  `)
}
