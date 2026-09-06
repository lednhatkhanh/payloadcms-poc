import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_editorial_activities_collection" AS ENUM('news', 'pages');
    CREATE TYPE "public"."enum_editorial_activities_action" AS ENUM('created', 'translation-requested', 'translations-submitted', 'review-requested', 'changes-requested', 'approved', 'scheduled', 'published');
    CREATE TYPE "public"."enum_editorial_activities_workflow_state" AS ENUM('draft', 'translation-requested', 'in-review', 'changes-requested', 'approved');
    CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'publish-scheduled-content');
    CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
    CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'publish-scheduled-content');

    CREATE TABLE "editorial_activities" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "collection" "enum_editorial_activities_collection" NOT NULL,
      "document_id" numeric NOT NULL,
      "action" "enum_editorial_activities_action" NOT NULL,
      "workflow_state" "enum_editorial_activities_workflow_state" NOT NULL,
      "actor_id" integer,
      "scheduled_for" timestamp(3) with time zone,
      "note" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE "payload_jobs_log" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "executed_at" timestamp(3) with time zone NOT NULL,
      "completed_at" timestamp(3) with time zone NOT NULL,
      "task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
      "task_i_d" varchar NOT NULL,
      "input" jsonb,
      "output" jsonb,
      "state" "enum_payload_jobs_log_state" NOT NULL,
      "error" jsonb
    );

    CREATE TABLE "payload_jobs" (
      "id" serial PRIMARY KEY NOT NULL,
      "input" jsonb,
      "completed_at" timestamp(3) with time zone,
      "total_tried" numeric DEFAULT 0,
      "has_error" boolean DEFAULT false,
      "error" jsonb,
      "task_slug" "enum_payload_jobs_task_slug",
      "queue" varchar DEFAULT 'default',
      "wait_until" timestamp(3) with time zone,
      "processing" boolean DEFAULT false,
      "meta" jsonb,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE "payload_jobs_stats" (
      "id" serial PRIMARY KEY NOT NULL,
      "stats" jsonb,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    ALTER TABLE "news" ADD COLUMN "scheduled_for" timestamp(3) with time zone;
    ALTER TABLE "_news_v" ADD COLUMN "version_scheduled_for" timestamp(3) with time zone;
    ALTER TABLE "pages" ADD COLUMN "scheduled_for" timestamp(3) with time zone;
    ALTER TABLE "_pages_v" ADD COLUMN "version_scheduled_for" timestamp(3) with time zone;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "editorial_activities_id" integer;

    ALTER TABLE "editorial_activities" ADD CONSTRAINT "editorial_activities_actor_id_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_editorial_activities_fk" FOREIGN KEY ("editorial_activities_id") REFERENCES "public"."editorial_activities"("id") ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "editorial_activities_actor_idx" ON "editorial_activities" USING btree ("actor_id");
    CREATE INDEX "editorial_activities_updated_at_idx" ON "editorial_activities" USING btree ("updated_at");
    CREATE INDEX "editorial_activities_created_at_idx" ON "editorial_activities" USING btree ("created_at");
    CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
    CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
    CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
    CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
    CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
    CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
    CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
    CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
    CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
    CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
    CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
    CREATE INDEX "payload_locked_documents_rels_editorial_activities_id_idx" ON "payload_locked_documents_rels" USING btree ("editorial_activities_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_editorial_activities_fk";
    ALTER TABLE "payload_jobs_log" DROP CONSTRAINT "payload_jobs_log_parent_id_fk";
    ALTER TABLE "editorial_activities" DROP CONSTRAINT "editorial_activities_actor_id_users_id_fk";

    DROP INDEX "payload_locked_documents_rels_editorial_activities_id_idx";
    DROP INDEX "payload_jobs_created_at_idx";
    DROP INDEX "payload_jobs_updated_at_idx";
    DROP INDEX "payload_jobs_processing_idx";
    DROP INDEX "payload_jobs_wait_until_idx";
    DROP INDEX "payload_jobs_queue_idx";
    DROP INDEX "payload_jobs_task_slug_idx";
    DROP INDEX "payload_jobs_has_error_idx";
    DROP INDEX "payload_jobs_total_tried_idx";
    DROP INDEX "payload_jobs_completed_at_idx";
    DROP INDEX "payload_jobs_log_parent_id_idx";
    DROP INDEX "payload_jobs_log_order_idx";
    DROP INDEX "editorial_activities_created_at_idx";
    DROP INDEX "editorial_activities_updated_at_idx";
    DROP INDEX "editorial_activities_actor_idx";

    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "editorial_activities_id";
    ALTER TABLE "_pages_v" DROP COLUMN "version_scheduled_for";
    ALTER TABLE "pages" DROP COLUMN "scheduled_for";
    ALTER TABLE "_news_v" DROP COLUMN "version_scheduled_for";
    ALTER TABLE "news" DROP COLUMN "scheduled_for";

    DROP TABLE "payload_jobs_stats" CASCADE;
    DROP TABLE "payload_jobs" CASCADE;
    DROP TABLE "payload_jobs_log" CASCADE;
    DROP TABLE "editorial_activities" CASCADE;

    DROP TYPE "public"."enum_payload_jobs_task_slug";
    DROP TYPE "public"."enum_payload_jobs_log_state";
    DROP TYPE "public"."enum_payload_jobs_log_task_slug";
    DROP TYPE "public"."enum_editorial_activities_workflow_state";
    DROP TYPE "public"."enum_editorial_activities_action";
    DROP TYPE "public"."enum_editorial_activities_collection";
  `)
}
