import { withPayload } from '@payloadcms/next/withPayload'
import { serverEnvironment } from '@repo/contracts/env'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { NextConfig } from 'next'

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
const cmsUrl = new URL(serverEnvironment.NEXT_PUBLIC_CMS_URL)

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    exposeTestingApiInProductionBuild: process.env.EXPOSE_TESTING_API === '1',
  },
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
        pathname: '/**',
        protocol: 'https',
      },
      {
        hostname: cmsUrl.hostname,
        pathname: '/**',
        port: cmsUrl.port,
        protocol: cmsUrl.protocol === 'https:' ? 'https' : 'http',
      },
    ],
  },
  logging: { browserToTerminal: true },
  output: 'standalone',
  partialPrefetching: true,
  reactCompiler: true,
  transpilePackages: ['@repo/contracts', '@repo/payload-config', '@repo/ui'],
  turbopack: { root: path.resolve(currentDirectory, '../..') },
}

export default withPayload(nextConfig)
