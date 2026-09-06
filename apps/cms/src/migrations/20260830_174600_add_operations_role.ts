import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TYPE "public"."enum_users_roles" ADD VALUE IF NOT EXISTS 'operations';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DELETE FROM "users_roles" WHERE "value" = 'operations';
    ALTER TABLE "users_roles" ALTER COLUMN "value" TYPE text USING "value"::text;
    DROP TYPE "public"."enum_users_roles";
    CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor', 'translator', 'reviewer', 'publisher');
    ALTER TABLE "users_roles" ALTER COLUMN "value" TYPE "public"."enum_users_roles" USING "value"::"public"."enum_users_roles";
  `)
}
