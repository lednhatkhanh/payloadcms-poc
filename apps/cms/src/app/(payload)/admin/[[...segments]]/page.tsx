import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@payload-config'
import type { Metadata } from 'next'

import { importMap } from '../importMap'

type PageProps = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<Record<string, string | string[]>>
}

export function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  return generatePageMetadata({ config, params, searchParams })
}

export default function Page({ params, searchParams }: PageProps) {
  return RootPage({ config, params, searchParams, importMap })
}
