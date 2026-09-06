import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'ja', 'es');
  CREATE TYPE "public"."enum_news_translation_locales" AS ENUM('ja', 'es');
  CREATE TYPE "public"."enum__news_v_version_translation_locales" AS ENUM('ja', 'es');
  CREATE TYPE "public"."enum__news_v_published_locale" AS ENUM('en', 'ja', 'es');
  CREATE TYPE "public"."enum__locations_v_published_locale" AS ENUM('en', 'ja', 'es');
  CREATE TYPE "public"."enum_pages_translation_locales" AS ENUM('ja', 'es');
  CREATE TYPE "public"."enum__pages_v_version_translation_locales" AS ENUM('ja', 'es');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'ja', 'es');
  CREATE TYPE "public"."enum__homepage_v_published_locale" AS ENUM('en', 'ja', 'es');
  ALTER TYPE "public"."enum_users_roles" ADD VALUE 'translator' BEFORE 'reviewer';
  ALTER TYPE "public"."enum_news_workflow_state" ADD VALUE 'translation-requested' BEFORE 'in-review';
  ALTER TYPE "public"."enum__news_v_version_workflow_state" ADD VALUE 'translation-requested' BEFORE 'in-review';
  ALTER TYPE "public"."enum_pages_workflow_state" ADD VALUE 'translation-requested' BEFORE 'in-review';
  ALTER TYPE "public"."enum__pages_v_version_workflow_state" ADD VALUE 'translation-requested' BEFORE 'in-review';
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_translation_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_news_translation_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "news_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_news_v_version_translation_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__news_v_version_translation_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_news_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "locations_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_locations_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_translation_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_pages_translation_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
	"title" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_version_translation_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_version_translation_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_locales" (
	"version_title" varchar,
  	"version_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_locales" (
  	"eyebrow" varchar,
  	"hero_title" varchar,
  	"hero_body" varchar,
  	"primary_cta_label" varchar,
  	"secondary_cta_label" varchar,
  	"about_title" varchar,
  	"about_body" varchar,
  	"contact_title" varchar,
  	"contact_body" varchar,
  	"newsletter_title" varchar,
  	"newsletter_body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_homepage_v_locales" (
  	"version_eyebrow" varchar,
  	"version_hero_title" varchar,
  	"version_hero_body" varchar,
  	"version_primary_cta_label" varchar,
  	"version_secondary_cta_label" varchar,
  	"version_about_title" varchar,
  	"version_about_body" varchar,
  	"version_contact_title" varchar,
  	"version_contact_body" varchar,
  	"version_newsletter_title" varchar,
  	"version_newsletter_body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DROP INDEX "pages_rels_pages_id_idx";
  DROP INDEX "_pages_v_rels_pages_id_idx";
  ALTER TABLE "news" ADD COLUMN "translation_requested_by_id" integer;
  ALTER TABLE "news" ADD COLUMN "translated_by_id" integer;
  ALTER TABLE "_news_v" ADD COLUMN "version_translation_requested_by_id" integer;
  ALTER TABLE "_news_v" ADD COLUMN "version_translated_by_id" integer;
  ALTER TABLE "_news_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_news_v" ADD COLUMN "published_locale" "enum__news_v_published_locale";
  ALTER TABLE "_locations_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_locations_v" ADD COLUMN "published_locale" "enum__locations_v_published_locale";
  ALTER TABLE "pages_blocks_rich_text" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "pages_blocks_image" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "pages_blocks_feature" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "pages_blocks_callout" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "pages_blocks_page_links" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "translation_requested_by_id" integer;
  ALTER TABLE "pages" ADD COLUMN "translated_by_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "_pages_v_blocks_rich_text" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "_pages_v_blocks_image" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "_pages_v_blocks_feature" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "_pages_v_blocks_callout" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "_pages_v_blocks_page_links" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "_pages_v" ADD COLUMN "version_translation_requested_by_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_translated_by_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "published_locale" "enum__pages_v_published_locale";
  ALTER TABLE "_pages_v_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "_homepage_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_homepage_v" ADD COLUMN "published_locale" "enum__homepage_v_published_locale";
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_translation_locales" ADD CONSTRAINT "news_translation_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_version_translation_locales" ADD CONSTRAINT "_news_v_version_translation_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_locales" ADD CONSTRAINT "_news_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_locales" ADD CONSTRAINT "locations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_locales" ADD CONSTRAINT "_locations_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_translation_locales" ADD CONSTRAINT "pages_translation_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_translation_locales" ADD CONSTRAINT "_pages_v_version_translation_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_locales" ADD CONSTRAINT "homepage_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_locales" ADD CONSTRAINT "_homepage_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "news_translation_locales_order_idx" ON "news_translation_locales" USING btree ("order");
  CREATE INDEX "news_translation_locales_parent_idx" ON "news_translation_locales" USING btree ("parent_id");
  CREATE UNIQUE INDEX "news_locales_locale_parent_id_unique" ON "news_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_news_v_version_translation_locales_order_idx" ON "_news_v_version_translation_locales" USING btree ("order");
  CREATE INDEX "_news_v_version_translation_locales_parent_idx" ON "_news_v_version_translation_locales" USING btree ("parent_id");
  CREATE UNIQUE INDEX "_news_v_locales_locale_parent_id_unique" ON "_news_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "locations_locales_locale_parent_id_unique" ON "locations_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_locations_v_locales_locale_parent_id_unique" ON "_locations_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_translation_locales_order_idx" ON "pages_translation_locales" USING btree ("order");
  CREATE INDEX "pages_translation_locales_parent_idx" ON "pages_translation_locales" USING btree ("parent_id");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_version_translation_locales_order_idx" ON "_pages_v_version_translation_locales" USING btree ("order");
  CREATE INDEX "_pages_v_version_translation_locales_parent_idx" ON "_pages_v_version_translation_locales" USING btree ("parent_id");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "homepage_locales_locale_parent_id_unique" ON "homepage_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_homepage_v_locales_locale_parent_id_unique" ON "_homepage_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "news" ADD CONSTRAINT "news_translation_requested_by_id_users_id_fk" FOREIGN KEY ("translation_requested_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_translated_by_id_users_id_fk" FOREIGN KEY ("translated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_translation_requested_by_id_users_id_fk" FOREIGN KEY ("version_translation_requested_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_translated_by_id_users_id_fk" FOREIGN KEY ("version_translated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_translation_requested_by_id_users_id_fk" FOREIGN KEY ("translation_requested_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_translated_by_id_users_id_fk" FOREIGN KEY ("translated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_translation_requested_by_id_users_id_fk" FOREIGN KEY ("version_translation_requested_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_translated_by_id_users_id_fk" FOREIGN KEY ("version_translated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "news_translation_requested_by_idx" ON "news" USING btree ("translation_requested_by_id");
  CREATE INDEX "news_translated_by_idx" ON "news" USING btree ("translated_by_id");
  CREATE INDEX "_news_v_version_version_translation_requested_by_idx" ON "_news_v" USING btree ("version_translation_requested_by_id");
  CREATE INDEX "_news_v_version_version_translated_by_idx" ON "_news_v" USING btree ("version_translated_by_id");
  CREATE INDEX "_news_v_snapshot_idx" ON "_news_v" USING btree ("snapshot");
  CREATE INDEX "_news_v_published_locale_idx" ON "_news_v" USING btree ("published_locale");
  CREATE INDEX "_locations_v_snapshot_idx" ON "_locations_v" USING btree ("snapshot");
  CREATE INDEX "_locations_v_published_locale_idx" ON "_locations_v" USING btree ("published_locale");
  CREATE INDEX "pages_blocks_rich_text_locale_idx" ON "pages_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "pages_blocks_image_locale_idx" ON "pages_blocks_image" USING btree ("_locale");
  CREATE INDEX "pages_blocks_feature_locale_idx" ON "pages_blocks_feature" USING btree ("_locale");
  CREATE INDEX "pages_blocks_callout_locale_idx" ON "pages_blocks_callout" USING btree ("_locale");
  CREATE INDEX "pages_blocks_page_links_locale_idx" ON "pages_blocks_page_links" USING btree ("_locale");
  CREATE INDEX "pages_translation_requested_by_idx" ON "pages" USING btree ("translation_requested_by_id");
  CREATE INDEX "pages_translated_by_idx" ON "pages" USING btree ("translated_by_id");
  CREATE INDEX "pages_rels_locale_idx" ON "pages_rels" USING btree ("locale");
  CREATE INDEX "_pages_v_blocks_rich_text_locale_idx" ON "_pages_v_blocks_rich_text" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_image_locale_idx" ON "_pages_v_blocks_image" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_feature_locale_idx" ON "_pages_v_blocks_feature" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_callout_locale_idx" ON "_pages_v_blocks_callout" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_page_links_locale_idx" ON "_pages_v_blocks_page_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_version_version_translation_requested_by_idx" ON "_pages_v" USING btree ("version_translation_requested_by_id");
  CREATE INDEX "_pages_v_version_version_translated_by_idx" ON "_pages_v" USING btree ("version_translated_by_id");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_rels_locale_idx" ON "_pages_v_rels" USING btree ("locale");
  CREATE INDEX "_homepage_v_snapshot_idx" ON "_homepage_v" USING btree ("snapshot");
  CREATE INDEX "_homepage_v_published_locale_idx" ON "_homepage_v" USING btree ("published_locale");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id","locale");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id","locale");
  INSERT INTO "media_locales" ("alt", "_locale", "_parent_id")
  SELECT "alt", 'en', "id" FROM "media"
  ON CONFLICT ("_locale", "_parent_id") DO NOTHING;
  INSERT INTO "news_locales" ("title", "excerpt", "body", "_locale", "_parent_id")
  SELECT "title", "excerpt", "body", 'en', "id" FROM "news"
  ON CONFLICT ("_locale", "_parent_id") DO NOTHING;
  INSERT INTO "_news_v_locales" ("version_title", "version_excerpt", "version_body", "_locale", "_parent_id")
  SELECT "version_title", "version_excerpt", "version_body", 'en', "id" FROM "_news_v"
  ON CONFLICT ("_locale", "_parent_id") DO NOTHING;
  INSERT INTO "locations_locales" ("title", "description", "_locale", "_parent_id")
  SELECT "title", "description", 'en', "id" FROM "locations"
  ON CONFLICT ("_locale", "_parent_id") DO NOTHING;
  INSERT INTO "_locations_v_locales" ("version_title", "version_description", "_locale", "_parent_id")
  SELECT "version_title", "version_description", 'en', "id" FROM "_locations_v"
  ON CONFLICT ("_locale", "_parent_id") DO NOTHING;
  INSERT INTO "pages_locales" ("title", "lead", "_locale", "_parent_id")
  SELECT "title", "lead", 'en', "id" FROM "pages"
  ON CONFLICT ("_locale", "_parent_id") DO NOTHING;
  INSERT INTO "_pages_v_locales" ("version_title", "version_lead", "_locale", "_parent_id")
  SELECT "version_title", "version_lead", 'en', "id" FROM "_pages_v"
  ON CONFLICT ("_locale", "_parent_id") DO NOTHING;
  INSERT INTO "homepage_locales" ("eyebrow", "hero_title", "hero_body", "primary_cta_label", "secondary_cta_label", "about_title", "about_body", "contact_title", "contact_body", "newsletter_title", "newsletter_body", "_locale", "_parent_id")
  SELECT "eyebrow", "hero_title", "hero_body", "primary_cta_label", "secondary_cta_label", "about_title", "about_body", "contact_title", "contact_body", "newsletter_title", "newsletter_body", 'en', "id" FROM "homepage"
  ON CONFLICT ("_locale", "_parent_id") DO NOTHING;
  INSERT INTO "_homepage_v_locales" ("version_eyebrow", "version_hero_title", "version_hero_body", "version_primary_cta_label", "version_secondary_cta_label", "version_about_title", "version_about_body", "version_contact_title", "version_contact_body", "version_newsletter_title", "version_newsletter_body", "_locale", "_parent_id")
  SELECT "version_eyebrow", "version_hero_title", "version_hero_body", "version_primary_cta_label", "version_secondary_cta_label", "version_about_title", "version_about_body", "version_contact_title", "version_contact_body", "version_newsletter_title", "version_newsletter_body", 'en', "id" FROM "_homepage_v"
  ON CONFLICT ("_locale", "_parent_id") DO NOTHING;
  UPDATE "pages_rels" SET "locale" = 'en' WHERE "locale" IS NULL;
  UPDATE "_pages_v_rels" SET "locale" = 'en' WHERE "locale" IS NULL;
  ALTER TABLE "media" DROP COLUMN "alt";
  ALTER TABLE "news" DROP COLUMN "title";
  ALTER TABLE "news" DROP COLUMN "excerpt";
  ALTER TABLE "news" DROP COLUMN "body";
  ALTER TABLE "_news_v" DROP COLUMN "version_title";
  ALTER TABLE "_news_v" DROP COLUMN "version_excerpt";
  ALTER TABLE "_news_v" DROP COLUMN "version_body";
  ALTER TABLE "locations" DROP COLUMN "title";
  ALTER TABLE "locations" DROP COLUMN "description";
  ALTER TABLE "_locations_v" DROP COLUMN "version_title";
  ALTER TABLE "_locations_v" DROP COLUMN "version_description";
  ALTER TABLE "pages" DROP COLUMN "lead";
  ALTER TABLE "pages" DROP COLUMN "title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_lead";
  ALTER TABLE "_pages_v" DROP COLUMN "version_title";
  ALTER TABLE "homepage" DROP COLUMN "eyebrow";
  ALTER TABLE "homepage" DROP COLUMN "hero_title";
  ALTER TABLE "homepage" DROP COLUMN "hero_body";
  ALTER TABLE "homepage" DROP COLUMN "primary_cta_label";
  ALTER TABLE "homepage" DROP COLUMN "secondary_cta_label";
  ALTER TABLE "homepage" DROP COLUMN "about_title";
  ALTER TABLE "homepage" DROP COLUMN "about_body";
  ALTER TABLE "homepage" DROP COLUMN "contact_title";
  ALTER TABLE "homepage" DROP COLUMN "contact_body";
  ALTER TABLE "homepage" DROP COLUMN "newsletter_title";
  ALTER TABLE "homepage" DROP COLUMN "newsletter_body";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_eyebrow";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_hero_title";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_hero_body";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_primary_cta_label";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_secondary_cta_label";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_about_title";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_about_body";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_contact_title";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_contact_body";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_newsletter_title";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_newsletter_body";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news_translation_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_version_translation_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_news_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_locations_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_translation_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_translation_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_homepage_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "news_translation_locales" CASCADE;
  DROP TABLE "news_locales" CASCADE;
  DROP TABLE "_news_v_version_translation_locales" CASCADE;
  DROP TABLE "_news_v_locales" CASCADE;
  DROP TABLE "locations_locales" CASCADE;
  DROP TABLE "_locations_v_locales" CASCADE;
  DROP TABLE "pages_translation_locales" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v_version_translation_locales" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "homepage_locales" CASCADE;
  DROP TABLE "_homepage_v_locales" CASCADE;
  ALTER TABLE "news" DROP CONSTRAINT "news_translation_requested_by_id_users_id_fk";
  
  ALTER TABLE "news" DROP CONSTRAINT "news_translated_by_id_users_id_fk";
  
  ALTER TABLE "_news_v" DROP CONSTRAINT "_news_v_version_translation_requested_by_id_users_id_fk";
  
  ALTER TABLE "_news_v" DROP CONSTRAINT "_news_v_version_translated_by_id_users_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_translation_requested_by_id_users_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_translated_by_id_users_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_translation_requested_by_id_users_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_translated_by_id_users_id_fk";
  
  ALTER TABLE "users_roles" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_users_roles";
  CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor', 'reviewer', 'publisher');
  ALTER TABLE "users_roles" ALTER COLUMN "value" SET DATA TYPE "public"."enum_users_roles" USING "value"::"public"."enum_users_roles";
  ALTER TABLE "news" ALTER COLUMN "workflow_state" SET DATA TYPE text;
  ALTER TABLE "news" ALTER COLUMN "workflow_state" SET DEFAULT 'draft'::text;
  DROP TYPE "public"."enum_news_workflow_state";
  CREATE TYPE "public"."enum_news_workflow_state" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  ALTER TABLE "news" ALTER COLUMN "workflow_state" SET DEFAULT 'draft'::"public"."enum_news_workflow_state";
  ALTER TABLE "news" ALTER COLUMN "workflow_state" SET DATA TYPE "public"."enum_news_workflow_state" USING "workflow_state"::"public"."enum_news_workflow_state";
  ALTER TABLE "_news_v" ALTER COLUMN "version_workflow_state" SET DATA TYPE text;
  ALTER TABLE "_news_v" ALTER COLUMN "version_workflow_state" SET DEFAULT 'draft'::text;
  DROP TYPE "public"."enum__news_v_version_workflow_state";
  CREATE TYPE "public"."enum__news_v_version_workflow_state" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  ALTER TABLE "_news_v" ALTER COLUMN "version_workflow_state" SET DEFAULT 'draft'::"public"."enum__news_v_version_workflow_state";
  ALTER TABLE "_news_v" ALTER COLUMN "version_workflow_state" SET DATA TYPE "public"."enum__news_v_version_workflow_state" USING "version_workflow_state"::"public"."enum__news_v_version_workflow_state";
  ALTER TABLE "pages" ALTER COLUMN "workflow_state" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "workflow_state" SET DEFAULT 'draft'::text;
  DROP TYPE "public"."enum_pages_workflow_state";
  CREATE TYPE "public"."enum_pages_workflow_state" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  ALTER TABLE "pages" ALTER COLUMN "workflow_state" SET DEFAULT 'draft'::"public"."enum_pages_workflow_state";
  ALTER TABLE "pages" ALTER COLUMN "workflow_state" SET DATA TYPE "public"."enum_pages_workflow_state" USING "workflow_state"::"public"."enum_pages_workflow_state";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_workflow_state" SET DATA TYPE text;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_workflow_state" SET DEFAULT 'draft'::text;
  DROP TYPE "public"."enum__pages_v_version_workflow_state";
  CREATE TYPE "public"."enum__pages_v_version_workflow_state" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_workflow_state" SET DEFAULT 'draft'::"public"."enum__pages_v_version_workflow_state";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_workflow_state" SET DATA TYPE "public"."enum__pages_v_version_workflow_state" USING "version_workflow_state"::"public"."enum__pages_v_version_workflow_state";
  DROP INDEX "news_translation_requested_by_idx";
  DROP INDEX "news_translated_by_idx";
  DROP INDEX "_news_v_version_version_translation_requested_by_idx";
  DROP INDEX "_news_v_version_version_translated_by_idx";
  DROP INDEX "_news_v_snapshot_idx";
  DROP INDEX "_news_v_published_locale_idx";
  DROP INDEX "_locations_v_snapshot_idx";
  DROP INDEX "_locations_v_published_locale_idx";
  DROP INDEX "pages_blocks_rich_text_locale_idx";
  DROP INDEX "pages_blocks_image_locale_idx";
  DROP INDEX "pages_blocks_feature_locale_idx";
  DROP INDEX "pages_blocks_callout_locale_idx";
  DROP INDEX "pages_blocks_page_links_locale_idx";
  DROP INDEX "pages_translation_requested_by_idx";
  DROP INDEX "pages_translated_by_idx";
  DROP INDEX "pages_rels_locale_idx";
  DROP INDEX "_pages_v_blocks_rich_text_locale_idx";
  DROP INDEX "_pages_v_blocks_image_locale_idx";
  DROP INDEX "_pages_v_blocks_feature_locale_idx";
  DROP INDEX "_pages_v_blocks_callout_locale_idx";
  DROP INDEX "_pages_v_blocks_page_links_locale_idx";
  DROP INDEX "_pages_v_version_version_translation_requested_by_idx";
  DROP INDEX "_pages_v_version_version_translated_by_idx";
  DROP INDEX "_pages_v_snapshot_idx";
  DROP INDEX "_pages_v_published_locale_idx";
  DROP INDEX "_pages_v_rels_locale_idx";
  DROP INDEX "_homepage_v_snapshot_idx";
  DROP INDEX "_homepage_v_published_locale_idx";
  DROP INDEX "pages_rels_pages_id_idx";
  DROP INDEX "_pages_v_rels_pages_id_idx";
  ALTER TABLE "media" ADD COLUMN "alt" varchar NOT NULL;
  ALTER TABLE "news" ADD COLUMN "title" varchar;
  ALTER TABLE "news" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "news" ADD COLUMN "body" jsonb;
  ALTER TABLE "_news_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_news_v" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "_news_v" ADD COLUMN "version_body" jsonb;
  ALTER TABLE "locations" ADD COLUMN "title" varchar;
  ALTER TABLE "locations" ADD COLUMN "description" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_locations_v" ADD COLUMN "version_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "lead" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_lead" varchar;
  ALTER TABLE "homepage" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "homepage" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "homepage" ADD COLUMN "hero_body" varchar;
  ALTER TABLE "homepage" ADD COLUMN "primary_cta_label" varchar;
  ALTER TABLE "homepage" ADD COLUMN "secondary_cta_label" varchar;
  ALTER TABLE "homepage" ADD COLUMN "about_title" varchar;
  ALTER TABLE "homepage" ADD COLUMN "about_body" varchar;
  ALTER TABLE "homepage" ADD COLUMN "contact_title" varchar;
  ALTER TABLE "homepage" ADD COLUMN "contact_body" varchar;
  ALTER TABLE "homepage" ADD COLUMN "newsletter_title" varchar;
  ALTER TABLE "homepage" ADD COLUMN "newsletter_body" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_eyebrow" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_hero_title" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_hero_body" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_primary_cta_label" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_secondary_cta_label" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_about_title" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_about_body" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_contact_title" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_contact_body" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_newsletter_title" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_newsletter_body" varchar;
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  ALTER TABLE "news" DROP COLUMN "translation_requested_by_id";
  ALTER TABLE "news" DROP COLUMN "translated_by_id";
  ALTER TABLE "_news_v" DROP COLUMN "version_translation_requested_by_id";
  ALTER TABLE "_news_v" DROP COLUMN "version_translated_by_id";
  ALTER TABLE "_news_v" DROP COLUMN "snapshot";
  ALTER TABLE "_news_v" DROP COLUMN "published_locale";
  ALTER TABLE "_locations_v" DROP COLUMN "snapshot";
  ALTER TABLE "_locations_v" DROP COLUMN "published_locale";
  ALTER TABLE "pages_blocks_rich_text" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_image" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_feature" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_callout" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_page_links" DROP COLUMN "_locale";
  ALTER TABLE "pages" DROP COLUMN "translation_requested_by_id";
  ALTER TABLE "pages" DROP COLUMN "translated_by_id";
  ALTER TABLE "pages_rels" DROP COLUMN "locale";
  ALTER TABLE "_pages_v_blocks_rich_text" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_image" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_feature" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_callout" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_page_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v" DROP COLUMN "version_translation_requested_by_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_translated_by_id";
  ALTER TABLE "_pages_v" DROP COLUMN "snapshot";
  ALTER TABLE "_pages_v" DROP COLUMN "published_locale";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "locale";
  ALTER TABLE "_homepage_v" DROP COLUMN "snapshot";
  ALTER TABLE "_homepage_v" DROP COLUMN "published_locale";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_news_translation_locales";
  DROP TYPE "public"."enum__news_v_version_translation_locales";
  DROP TYPE "public"."enum__news_v_published_locale";
  DROP TYPE "public"."enum__locations_v_published_locale";
  DROP TYPE "public"."enum_pages_translation_locales";
  DROP TYPE "public"."enum__pages_v_version_translation_locales";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum__homepage_v_published_locale";`)
}
