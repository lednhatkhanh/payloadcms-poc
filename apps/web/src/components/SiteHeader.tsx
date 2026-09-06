'use client'

import { Button } from '@repo/ui/button'
import { Container, HeaderBar, HeaderNavigation, SiteBrand, SiteHeaderFrame } from '@repo/ui/layout'
import { ButtonLink, Link } from '@repo/ui/link'
import { Suspense, useState } from 'react'

import { LanguageSelector } from './LanguageSelector'
import { LanguageSelectorSkeleton } from './LoadingSkeletons'

export function SiteHeader() {
  const [isMenuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <SiteHeaderFrame>
      <Container>
        <HeaderBar>
          <Link href="/" variant="navigation">
            <SiteBrand>Shipping &amp; logistics</SiteBrand>
          </Link>
          <Button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onPress={() => setMenuOpen((current) => !current)}
            size="sm"
            variant="navigation"
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </Button>
          <HeaderNavigation isOpen={isMenuOpen}>
            <Link href="/shipping" onPress={closeMenu} variant="navigation">
              Shipping
            </Link>
            <Link href="/locations" onPress={closeMenu} variant="navigation">
              Locations
            </Link>
            <Link href="/news" onPress={closeMenu} variant="navigation">
              The Dispatch
            </Link>
            <Link href="/#about" onPress={closeMenu} variant="navigation">
              About
            </Link>
            <Suspense fallback={<LanguageSelectorSkeleton />}>
              <LanguageSelector />
            </Suspense>
            <ButtonLink href="/#enquiry" onPress={closeMenu} size="sm" variant="secondary">
              Start an enquiry
            </ButtonLink>
          </HeaderNavigation>
        </HeaderBar>
      </Container>
    </SiteHeaderFrame>
  )
}
