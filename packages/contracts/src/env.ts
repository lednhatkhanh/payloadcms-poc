import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { z } from 'zod'

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
const rootEnvironmentPath = path.resolve(currentDirectory, '../../../.env')

if (existsSync(rootEnvironmentPath)) {
  process.loadEnvFile(rootEnvironmentPath)
}

const serverEnvironmentSchema = z.object({
  DATABASE_URL: z.url(),
  NEXT_PUBLIC_CMS_URL: z.url(),
  NEXT_PUBLIC_WEB_URL: z.url(),
  PAYLOAD_PUBLIC_SERVER_URL: z.url(),
  PAYLOAD_SECRET: z.string().min(32),
})

export const serverEnvironment = serverEnvironmentSchema.parse(process.env)

export const publicEnvironment = {
  cmsUrl: serverEnvironment.NEXT_PUBLIC_CMS_URL,
  webUrl: serverEnvironment.NEXT_PUBLIC_WEB_URL,
} as const
