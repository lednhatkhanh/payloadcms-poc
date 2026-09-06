import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_countries_supported_locales" AS ENUM('en', 'ja', 'es');
    CREATE TYPE "public"."enum_countries_default_locale" AS ENUM('en', 'ja', 'es');
    CREATE TYPE "public"."enum_news_scope" AS ENUM('global', 'country');
    CREATE TYPE "public"."enum__news_v_version_scope" AS ENUM('global', 'country');

    CREATE TABLE "countries" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "code" varchar NOT NULL,
      "default_locale" "enum_countries_default_locale" NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE TABLE "countries_supported_locales" (
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "value" "enum_countries_supported_locales",
      "id" serial PRIMARY KEY NOT NULL
    );
    CREATE TABLE "users_countries" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "country_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL
    );

    ALTER TABLE "users" ADD COLUMN "global_access" boolean DEFAULT false NOT NULL;
    DROP INDEX "news_slug_idx";
    ALTER TABLE "media" ADD COLUMN "country_id" integer;
    ALTER TABLE "news" ADD COLUMN "scope" "enum_news_scope" DEFAULT 'global' NOT NULL;
    ALTER TABLE "news" ADD COLUMN "country_id" integer;
    ALTER TABLE "_news_v" ADD COLUMN "version_scope" "enum__news_v_version_scope" DEFAULT 'global';
    ALTER TABLE "_news_v" ADD COLUMN "version_country_id" integer;
    ALTER TABLE "locations" RENAME COLUMN "country" TO "country_name";
    ALTER TABLE "locations" ADD COLUMN "country_id" integer;
    ALTER TABLE "_locations_v" RENAME COLUMN "version_country" TO "version_country_name";
    ALTER TABLE "_locations_v" ADD COLUMN "version_country_id" integer;

    ALTER TABLE "countries_supported_locales" ADD CONSTRAINT "countries_supported_locales_parent_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "users_countries" ADD CONSTRAINT "users_countries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "users_countries" ADD CONSTRAINT "users_countries_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "media" ADD CONSTRAINT "media_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "news" ADD CONSTRAINT "news_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_country_id_countries_id_fk" FOREIGN KEY ("version_country_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "locations" ADD CONSTRAINT "locations_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_version_country_id_countries_id_fk" FOREIGN KEY ("version_country_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;

    CREATE UNIQUE INDEX "countries_code_idx" ON "countries" USING btree ("code");
    CREATE INDEX "countries_updated_at_idx" ON "countries" USING btree ("updated_at");
    CREATE INDEX "countries_created_at_idx" ON "countries" USING btree ("created_at");
    CREATE INDEX "countries_supported_locales_order_idx" ON "countries_supported_locales" USING btree ("order");
    CREATE INDEX "countries_supported_locales_parent_id_idx" ON "countries_supported_locales" USING btree ("parent_id");
    CREATE INDEX "users_countries_order_idx" ON "users_countries" USING btree ("_order");
    CREATE INDEX "users_countries_parent_id_idx" ON "users_countries" USING btree ("_parent_id");
    CREATE INDEX "users_countries_country_idx" ON "users_countries" USING btree ("country_id");
    CREATE INDEX "media_country_idx" ON "media" USING btree ("country_id");
    CREATE INDEX "news_scope_idx" ON "news" USING btree ("scope");
    CREATE INDEX "news_country_idx" ON "news" USING btree ("country_id");
    CREATE UNIQUE INDEX "news_country_slug_idx" ON "news" USING btree ("country_id", "slug");
    CREATE INDEX "_news_v_version_scope_idx" ON "_news_v" USING btree ("version_scope");
    CREATE INDEX "_news_v_version_country_idx" ON "_news_v" USING btree ("version_country_id");
    CREATE INDEX "locations_country_idx" ON "locations" USING btree ("country_id");
    CREATE INDEX "_locations_v_version_country_idx" ON "_locations_v" USING btree ("version_country_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX "countries_code_idx";
    DROP INDEX "countries_updated_at_idx";
    DROP INDEX "countries_created_at_idx";
    DROP INDEX "countries_supported_locales_order_idx";
    DROP INDEX "countries_supported_locales_parent_id_idx";
    DROP INDEX "users_countries_order_idx";
    DROP INDEX "users_countries_parent_id_idx";
    DROP INDEX "users_countries_country_idx";
    DROP INDEX "media_country_idx";
    DROP INDEX "news_scope_idx";
    DROP INDEX "news_country_idx";
    DROP INDEX "news_country_slug_idx";
    DROP INDEX "_news_v_version_scope_idx";
    DROP INDEX "_news_v_version_country_idx";
    DROP INDEX "locations_country_idx";
    DROP INDEX "_locations_v_version_country_idx";
    ALTER TABLE "media" DROP CONSTRAINT "media_country_id_countries_id_fk";
    ALTER TABLE "news" DROP CONSTRAINT "news_country_id_countries_id_fk";
    ALTER TABLE "_news_v" DROP CONSTRAINT "_news_v_version_country_id_countries_id_fk";
    ALTER TABLE "locations" DROP CONSTRAINT "locations_country_id_countries_id_fk";
    ALTER TABLE "_locations_v" DROP CONSTRAINT "_locations_v_version_country_id_countries_id_fk";
    ALTER TABLE "users_countries" DROP CONSTRAINT "users_countries_parent_id_fk";
    ALTER TABLE "users_countries" DROP CONSTRAINT "users_countries_country_id_countries_id_fk";
    ALTER TABLE "countries_supported_locales" DROP CONSTRAINT "countries_supported_locales_parent_id_fk";
    ALTER TABLE "_locations_v" DROP COLUMN "version_country_id";
    ALTER TABLE "_locations_v" RENAME COLUMN "version_country_name" TO "version_country";
    ALTER TABLE "locations" DROP COLUMN "country_id";
    ALTER TABLE "locations" RENAME COLUMN "country_name" TO "country";
    ALTER TABLE "_news_v" DROP COLUMN "version_country_id";
    ALTER TABLE "_news_v" DROP COLUMN "version_scope";
    ALTER TABLE "news" DROP COLUMN "country_id";
    ALTER TABLE "news" DROP COLUMN "scope";
    ALTER TABLE "media" DROP COLUMN "country_id";
    ALTER TABLE "users" DROP COLUMN "global_access";
    CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
    DROP TABLE "users_countries";
    DROP TABLE "countries_supported_locales";
    DROP TABLE "countries";
    DROP TYPE "public"."enum__news_v_version_scope";
    DROP TYPE "public"."enum_news_scope";
    DROP TYPE "public"."enum_countries_default_locale";
    DROP TYPE "public"."enum_countries_supported_locales";
  `)
}
