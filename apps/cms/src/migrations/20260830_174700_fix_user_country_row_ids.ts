import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "users_countries" ALTER COLUMN "id" DROP DEFAULT;
    ALTER TABLE "users_countries" ALTER COLUMN "id" TYPE varchar USING "id"::varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "users_countries" ALTER COLUMN "id" TYPE integer USING "id"::integer;
    ALTER TABLE "users_countries" ALTER COLUMN "id" SET DEFAULT nextval('users_countries_id_seq'::regclass);
  `)
}
