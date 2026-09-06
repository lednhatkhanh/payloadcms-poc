import {
  contentLocaleCookie,
  contentLocaleCookieMaxAge,
  defaultContentLocale,
  isContentLocale,
  type ContentLocale,
} from '@repo/payload-config/locales'
import { NextResponse, type NextRequest } from 'next/server'

function localeForRequest(request: NextRequest): ContentLocale {
  const savedLocale = request.cookies.get(contentLocaleCookie)?.value
  return isContentLocale(savedLocale) ? savedLocale : defaultContentLocale
}

function localeResponse(response: NextResponse, locale: ContentLocale): NextResponse {
  response.cookies.set(contentLocaleCookie, locale, {
    maxAge: contentLocaleCookieMaxAge,
    path: '/',
    sameSite: 'lax',
  })
  return response
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const firstSegment = pathname.split('/')[1]

  if (!isContentLocale(firstSegment)) {
    const destination = request.nextUrl.clone()
    destination.pathname = `/${localeForRequest(request)}${pathname === '/' ? '' : pathname}`
    return localeResponse(NextResponse.redirect(destination), localeForRequest(request))
  }

  return localeResponse(NextResponse.next(), firstSegment)
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|robots.txt|sitemap.xml).*)'],
}
