import { withPayload } from '@payloadcms/next/withPayload'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { NextConfig } from 'next'

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  transpilePackages: ['@repo/contracts', '@repo/payload-config', '@repo/ui'],
  turbopack: { root: path.resolve(currentDirectory, '../..') },
}

export default withPayload(nextConfig)
