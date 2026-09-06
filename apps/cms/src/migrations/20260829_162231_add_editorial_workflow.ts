import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor', 'reviewer', 'publisher');
  CREATE TYPE "public"."enum_news_workflow_state" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum__news_v_version_workflow_state" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum_pages_workflow_state" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TYPE "public"."enum__pages_v_version_workflow_state" AS ENUM('draft', 'in-review', 'changes-requested', 'approved');
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"media_id" integer,
  	"link_label" varchar,
  	"link_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"media_id" integer,
  	"link_label" varchar,
  	"link_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "news" ADD COLUMN "workflow_state" "enum_news_workflow_state" DEFAULT 'draft';
  ALTER TABLE "news" ADD COLUMN "review_note" varchar;
  ALTER TABLE "news" ADD COLUMN "review_requested_by_id" integer;
  ALTER TABLE "news" ADD COLUMN "reviewed_by_id" integer;
  ALTER TABLE "_news_v" ADD COLUMN "version_workflow_state" "enum__news_v_version_workflow_state" DEFAULT 'draft';
  ALTER TABLE "_news_v" ADD COLUMN "version_review_note" varchar;
  ALTER TABLE "_news_v" ADD COLUMN "version_review_requested_by_id" integer;
  ALTER TABLE "_news_v" ADD COLUMN "version_reviewed_by_id" integer;
  ALTER TABLE "pages" ADD COLUMN "workflow_state" "enum_pages_workflow_state" DEFAULT 'draft';
  ALTER TABLE "pages" ADD COLUMN "review_note" varchar;
  ALTER TABLE "pages" ADD COLUMN "review_requested_by_id" integer;
  ALTER TABLE "pages" ADD COLUMN "reviewed_by_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_workflow_state" "enum__pages_v_version_workflow_state" DEFAULT 'draft';
  ALTER TABLE "_pages_v" ADD COLUMN "version_review_note" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_review_requested_by_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_reviewed_by_id" integer;
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image" ADD CONSTRAINT "pages_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature" ADD CONSTRAINT "pages_blocks_feature_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature" ADD CONSTRAINT "pages_blocks_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image" ADD CONSTRAINT "_pages_v_blocks_image_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image" ADD CONSTRAINT "_pages_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature" ADD CONSTRAINT "_pages_v_blocks_feature_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature" ADD CONSTRAINT "_pages_v_blocks_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_image_order_idx" ON "pages_blocks_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_parent_id_idx" ON "pages_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_path_idx" ON "pages_blocks_image" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_media_idx" ON "pages_blocks_image" USING btree ("media_id");
  CREATE INDEX "pages_blocks_feature_order_idx" ON "pages_blocks_feature" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_parent_id_idx" ON "pages_blocks_feature" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_path_idx" ON "pages_blocks_feature" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_media_idx" ON "pages_blocks_feature" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_image_order_idx" ON "_pages_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_parent_id_idx" ON "_pages_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_path_idx" ON "_pages_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_media_idx" ON "_pages_v_blocks_image" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_feature_order_idx" ON "_pages_v_blocks_feature" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_parent_id_idx" ON "_pages_v_blocks_feature" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_path_idx" ON "_pages_v_blocks_feature" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_media_idx" ON "_pages_v_blocks_feature" USING btree ("media_id");
  ALTER TABLE "news" ADD CONSTRAINT "news_review_requested_by_id_users_id_fk" FOREIGN KEY ("review_requested_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_reviewed_by_id_users_id_fk" FOREIGN KEY ("reviewed_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_review_requested_by_id_users_id_fk" FOREIGN KEY ("version_review_requested_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_reviewed_by_id_users_id_fk" FOREIGN KEY ("version_reviewed_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_review_requested_by_id_users_id_fk" FOREIGN KEY ("review_requested_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_reviewed_by_id_users_id_fk" FOREIGN KEY ("reviewed_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_review_requested_by_id_users_id_fk" FOREIGN KEY ("version_review_requested_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_reviewed_by_id_users_id_fk" FOREIGN KEY ("version_reviewed_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "news_workflow_state_idx" ON "news" USING btree ("workflow_state");
  CREATE INDEX "news_review_requested_by_idx" ON "news" USING btree ("review_requested_by_id");
  CREATE INDEX "news_reviewed_by_idx" ON "news" USING btree ("reviewed_by_id");
  CREATE INDEX "_news_v_version_version_workflow_state_idx" ON "_news_v" USING btree ("version_workflow_state");
  CREATE INDEX "_news_v_version_version_review_requested_by_idx" ON "_news_v" USING btree ("version_review_requested_by_id");
  CREATE INDEX "_news_v_version_version_reviewed_by_idx" ON "_news_v" USING btree ("version_reviewed_by_id");
  CREATE INDEX "pages_workflow_state_idx" ON "pages" USING btree ("workflow_state");
  CREATE INDEX "pages_review_requested_by_idx" ON "pages" USING btree ("review_requested_by_id");
  CREATE INDEX "pages_reviewed_by_idx" ON "pages" USING btree ("reviewed_by_id");
  CREATE INDEX "_pages_v_version_version_workflow_state_idx" ON "_pages_v" USING btree ("version_workflow_state");
  CREATE INDEX "_pages_v_version_version_review_requested_by_idx" ON "_pages_v" USING btree ("version_review_requested_by_id");
  CREATE INDEX "_pages_v_version_version_reviewed_by_idx" ON "_pages_v" USING btree ("version_reviewed_by_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users_roles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "users_roles" CASCADE;
  DROP TABLE "pages_blocks_image" CASCADE;
  DROP TABLE "pages_blocks_feature" CASCADE;
  DROP TABLE "_pages_v_blocks_image" CASCADE;
  DROP TABLE "_pages_v_blocks_feature" CASCADE;
  ALTER TABLE "news" DROP CONSTRAINT "news_review_requested_by_id_users_id_fk";
  
  ALTER TABLE "news" DROP CONSTRAINT "news_reviewed_by_id_users_id_fk";
  
  ALTER TABLE "_news_v" DROP CONSTRAINT "_news_v_version_review_requested_by_id_users_id_fk";
  
  ALTER TABLE "_news_v" DROP CONSTRAINT "_news_v_version_reviewed_by_id_users_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_review_requested_by_id_users_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_reviewed_by_id_users_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_review_requested_by_id_users_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_reviewed_by_id_users_id_fk";
  
  DROP INDEX "news_workflow_state_idx";
  DROP INDEX "news_review_requested_by_idx";
  DROP INDEX "news_reviewed_by_idx";
  DROP INDEX "_news_v_version_version_workflow_state_idx";
  DROP INDEX "_news_v_version_version_review_requested_by_idx";
  DROP INDEX "_news_v_version_version_reviewed_by_idx";
  DROP INDEX "pages_workflow_state_idx";
  DROP INDEX "pages_review_requested_by_idx";
  DROP INDEX "pages_reviewed_by_idx";
  DROP INDEX "_pages_v_version_version_workflow_state_idx";
  DROP INDEX "_pages_v_version_version_review_requested_by_idx";
  DROP INDEX "_pages_v_version_version_reviewed_by_idx";
  ALTER TABLE "news" DROP COLUMN "workflow_state";
  ALTER TABLE "news" DROP COLUMN "review_note";
  ALTER TABLE "news" DROP COLUMN "review_requested_by_id";
  ALTER TABLE "news" DROP COLUMN "reviewed_by_id";
  ALTER TABLE "_news_v" DROP COLUMN "version_workflow_state";
  ALTER TABLE "_news_v" DROP COLUMN "version_review_note";
  ALTER TABLE "_news_v" DROP COLUMN "version_review_requested_by_id";
  ALTER TABLE "_news_v" DROP COLUMN "version_reviewed_by_id";
  ALTER TABLE "pages" DROP COLUMN "workflow_state";
  ALTER TABLE "pages" DROP COLUMN "review_note";
  ALTER TABLE "pages" DROP COLUMN "review_requested_by_id";
  ALTER TABLE "pages" DROP COLUMN "reviewed_by_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_workflow_state";
  ALTER TABLE "_pages_v" DROP COLUMN "version_review_note";
  ALTER TABLE "_pages_v" DROP COLUMN "version_review_requested_by_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_reviewed_by_id";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_news_workflow_state";
  DROP TYPE "public"."enum__news_v_version_workflow_state";
  DROP TYPE "public"."enum_pages_workflow_state";
  DROP TYPE "public"."enum__pages_v_version_workflow_state";`)
}
