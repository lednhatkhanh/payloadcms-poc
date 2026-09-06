import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_contact_submissions_request_type" AS ENUM('general', 'quote', 'shipment');
    CREATE TYPE "public"."enum_contact_submissions_service" AS ENUM('ocean-freight', 'logistics-solutions');
    CREATE TYPE "public"."enum_contact_submissions_status" AS ENUM('new', 'in-progress', 'closed');

    ALTER TABLE "contact_submissions" ADD COLUMN "request_type" "enum_contact_submissions_request_type" DEFAULT 'general' NOT NULL;
    ALTER TABLE "contact_submissions" ADD COLUMN "service" "enum_contact_submissions_service";
    ALTER TABLE "contact_submissions" ADD COLUMN "origin" varchar;
    ALTER TABLE "contact_submissions" ADD COLUMN "destination" varchar;
    ALTER TABLE "contact_submissions" ADD COLUMN "shipment_reference" varchar;
    ALTER TABLE "contact_submissions" ADD COLUMN "status" "enum_contact_submissions_status" DEFAULT 'new' NOT NULL;

    CREATE INDEX "contact_submissions_request_type_idx" ON "contact_submissions" USING btree ("request_type");
    CREATE INDEX "contact_submissions_status_idx" ON "contact_submissions" USING btree ("status");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX "contact_submissions_request_type_idx";
    DROP INDEX "contact_submissions_status_idx";

    ALTER TABLE "contact_submissions" DROP COLUMN "request_type";
    ALTER TABLE "contact_submissions" DROP COLUMN "service";
    ALTER TABLE "contact_submissions" DROP COLUMN "origin";
    ALTER TABLE "contact_submissions" DROP COLUMN "destination";
    ALTER TABLE "contact_submissions" DROP COLUMN "shipment_reference";
    ALTER TABLE "contact_submissions" DROP COLUMN "status";

    DROP TYPE "public"."enum_contact_submissions_request_type";
    DROP TYPE "public"."enum_contact_submissions_service";
    DROP TYPE "public"."enum_contact_submissions_status";
  `)
}
