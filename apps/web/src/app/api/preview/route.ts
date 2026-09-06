import { newsPreviewToken, pagePreviewToken } from '@repo/payload-config/preview'
import { defaultContentLocale, isContentLocale } from '@repo/payload-config/locales'
import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

import { getNewsPreviewPathById, getPagePathById } from '@/lib/content'

function previewId(value: string | null): number | undefined {
  if (!value) return undefined
  const id = Number(value)
  return Number.isSafeInteger(id) && id > 0 ? id : undefined
}

function previewLocale(value: string | null) {
  return isContentLocale(value ?? undefined) ? value : defaultContentLocale
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = previewId(searchParams.get('id'))
  if (!id) return new Response('Invalid preview document.', { status: 400 })

  if (searchParams.get('kind') === 'news') {
    if (searchParams.get('token') !== newsPreviewToken) {
      return new Response('Invalid preview token.', { status: 401 })
    }

    const news = await getNewsPreviewPathById(id)
    if (!news) return new Response('News story not found.', { status: 404 })

    const preview = await draftMode()
    preview.enable()
    const destination = new URL(
      `/${previewLocale(searchParams.get('locale'))}/news/${encodeURIComponent(news.slug)}`,
      request.url,
    )
    if (news.countryCode) destination.searchParams.set('country', news.countryCode)
    destination.searchParams.set('id', String(id))
    destination.searchParams.set('preview', newsPreviewToken)
    return NextResponse.redirect(destination)
  }

  if (searchParams.get('token') !== pagePreviewToken) {
    return new Response('Invalid preview token.', { status: 401 })
  }

  const path = await getPagePathById(id)
  if (!path) return new Response('Page not found.', { status: 404 })

  const preview = await draftMode()
  preview.enable()
  const destination = new URL(`/${previewLocale(searchParams.get('locale'))}${path}`, request.url)
  destination.searchParams.set('id', String(id))
  destination.searchParams.set('preview', pagePreviewToken)
  return NextResponse.redirect(destination)
}
