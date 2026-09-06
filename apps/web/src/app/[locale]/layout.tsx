import '@repo/ui/styles.css'

import { contentLocales } from '@repo/payload-config/locales'
import { UiProvider } from '@repo/ui/providers'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { Suspense } from 'react'

import { PreviewBanner } from '@/components/PreviewBanner'
import { SiteHeader } from '@/components/SiteHeader'
import { getSeoSettings } from '@/lib/content'
import { getSiteLocale, localeTag } from '@/lib/locale'
import { buildSiteMetadata } from '@/lib/seo'

const notoSans = Noto_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-noto-sans',
})

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata(await getSeoSettings('en'))
}

export function generateStaticParams() {
  return contentLocales.map((locale) => ({ locale }))
}

export default async function RootLayout({ children }: { readonly children: React.ReactNode }) {
  const locale = await getSiteLocale()

  return (
    <html
      className={notoSans.variable}
      data-scroll-behavior="smooth"
      dir="ltr"
      lang={localeTag(locale)}
    >
      <body>
        <UiProvider>
          <SiteHeader />
          <Suspense fallback={null}>
            <PreviewBanner />
          </Suspense>
          <main>{children}</main>
        </UiProvider>
      </body>
    </html>
  )
}
