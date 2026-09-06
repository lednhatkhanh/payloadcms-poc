/* THIS FILE FOLLOWS PAYLOAD'S GENERATED ROOT LAYOUT CONTRACT. */
import config from '@payload-config'
import '@payloadcms/next/css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import { Noto_Sans } from 'next/font/google'
import type { ServerFunctionClient } from 'payload'

import { importMap } from './admin/importMap.js'
import './custom.css'

const notoSans = Noto_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-noto-sans',
})

const serverFunction: ServerFunctionClient = async function serverFunction(args) {
  'use server'
  return handleServerFunctions({ ...args, config, importMap })
}

export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      <div className={notoSans.variable}>{children}</div>
    </RootLayout>
  )
}
