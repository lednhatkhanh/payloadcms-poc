import type { ReactNode } from 'react'
import Image from 'next/image'

import { Link } from './link'

export function Card({ children }: { readonly children: ReactNode }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-surface shadow-card transition duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover">
      {children}
    </article>
  )
}

export function CardBody({ children }: { readonly children: ReactNode }) {
  return <div className="flex flex-1 flex-col gap-space-md p-space-lg">{children}</div>
}

export function LocationCard({
  children,
  href,
}: {
  readonly children: ReactNode
  readonly href?: string
}) {
  const card = (
    <article className="group flex h-full min-h-card-location flex-col overflow-hidden rounded-lg border border-neutral-200 bg-surface shadow-card transition duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover motion-reduce:transition-none">
      {children}
    </article>
  )

  return href ? (
    <Link href={href} variant="card">
      {card}
    </Link>
  ) : (
    card
  )
}

export function LocationCardBody({ children }: { readonly children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col justify-between gap-space-md p-space-lg">{children}</div>
  )
}

export function LocationCardContent({ children }: { readonly children: ReactNode }) {
  return <div className="mt-space-location-heading flex flex-col gap-space-sm">{children}</div>
}

export function CardLinkAffordance({ children }: { readonly children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-space-xs whitespace-nowrap text-small font-semibold text-brand-800">
      {children}
    </span>
  )
}

export function LocationCardMedia({
  alt,
  src,
}: {
  readonly alt: string
  readonly src?: string | undefined
}) {
  return (
    <div className="relative h-media-location overflow-hidden bg-brand-100">
      {src ? (
        <Image
          alt={alt}
          className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          src={src}
        />
      ) : (
        <span className="flex h-full items-end bg-brand-50 p-space-lg font-mono text-meta text-muted">
          Purposeful no-image state
        </span>
      )}
    </div>
  )
}

export function LocationDetailMedia({ alt, src }: { readonly alt: string; readonly src: string }) {
  return (
    <figure>
      <div className="relative min-h-media-location-detail overflow-hidden rounded-lg border border-neutral-200 bg-brand-100 shadow-card">
        <Image
          alt={alt}
          className="object-cover"
          fill
          preload
          sizes="(min-width: 1024px) 83rem, 100vw"
          src={src}
        />
      </div>
    </figure>
  )
}

export function LocationFactPanel({
  facts,
}: {
  readonly facts: readonly { readonly label: string; readonly value: string }[]
}) {
  return (
    <aside className="rounded-lg border border-neutral-200 bg-surface p-space-lg shadow-card">
      <dl className="flex flex-col gap-space-lg">
        {facts.map((fact) => (
          <div className="flex flex-col gap-space-2xs" key={fact.label}>
            <dt className="font-mono text-meta font-bold uppercase tracking-label text-muted">
              {fact.label}
            </dt>
            <dd className="text-body text-foreground">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}

export function CardMedia({
  alt,
  src,
}: {
  readonly alt: string
  readonly src?: string | undefined
}) {
  return (
    <div className="relative aspect-video overflow-hidden bg-brand-100">
      {src ? (
        <Image
          alt={alt}
          className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          src={src}
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-brand-100 via-brand-300 to-brand-700" />
      )}
    </div>
  )
}

export function ArticleHeroMedia({ alt, src }: { readonly alt: string; readonly src: string }) {
  return (
    <figure>
      <div className="relative aspect-video overflow-hidden bg-brand-100">
        <Image
          alt={alt}
          className="object-cover"
          fill
          preload
          sizes="(min-width: 1024px) 83rem, 100vw"
          src={src}
        />
      </div>
    </figure>
  )
}

export function ArticleBody({ children }: { readonly children: ReactNode }) {
  return <div className="article-body">{children}</div>
}

export function ServiceCard({ children }: { readonly children: ReactNode }) {
  return (
    <article className="flex min-h-card-service flex-col justify-between border-b border-r border-border bg-page p-space-card-service transition duration-200 first:border-l max-md:border-l hover:-translate-y-1 hover:bg-surface motion-reduce:transition-none">
      {children}
    </article>
  )
}

export function StoryCardContent({ children }: { readonly children: ReactNode }) {
  return (
    <div className="story-card-content mt-space-card-heading flex flex-col gap-space-sm">
      {children}
    </div>
  )
}

export function StoryCardMeta({ children }: { readonly children: ReactNode }) {
  return <div className="font-mono text-meta text-muted">{children}</div>
}

export function StoryCardFooter({ children }: { readonly children: ReactNode }) {
  return (
    <div className="mt-space-lg flex items-center justify-between gap-space-md">{children}</div>
  )
}

export function StoryCardMedia({
  alt,
  preload = false,
  src,
}: {
  readonly alt: string
  readonly preload?: boolean
  readonly src: string
}) {
  return (
    <div className="relative mb-space-card-media h-media-story overflow-hidden rounded-md bg-brand-100">
      <Image
        alt={alt}
        className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none"
        fill
        preload={preload}
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        src={src}
      />
    </div>
  )
}

export function StoryCard({
  children,
  featured = false,
  href,
  label,
  size = 'default',
}: {
  readonly children: ReactNode
  readonly featured?: boolean
  readonly href?: string
  readonly label?: string
  readonly size?: 'compact' | 'default'
}) {
  const card = (
    <article
      className={
        featured
          ? 'group flex h-full min-h-card-story-featured flex-col justify-between rounded-lg border border-neutral-200 bg-surface-soft p-space-lg shadow-card transition duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover motion-reduce:transition-none'
          : size === 'compact'
            ? 'group flex h-full flex-col justify-between rounded-lg border border-neutral-200 bg-surface p-space-lg shadow-card transition duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover motion-reduce:transition-none'
            : 'group flex h-full min-h-card-story flex-col justify-between rounded-lg border border-neutral-200 bg-surface p-space-lg shadow-card transition duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover motion-reduce:transition-none'
      }
    >
      {children}
    </article>
  )

  return href ? (
    <Link {...(label ? { 'aria-label': label } : {})} href={href} variant="card">
      {card}
    </Link>
  ) : (
    card
  )
}

export function FeaturedStoryCard({
  alt,
  children,
  href,
  label,
  src,
}: {
  readonly alt: string
  readonly children: ReactNode
  readonly href: string
  readonly label: string
  readonly src: string
}) {
  return (
    <Link aria-label={label} href={href} variant="card">
      <article className="group grid min-h-card-story-featured overflow-hidden rounded-lg border border-neutral-200 bg-surface-soft shadow-card transition duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover motion-reduce:transition-none lg:grid-cols-featured-story">
        <div className="relative min-h-media-story overflow-hidden bg-brand-100">
          <Image
            alt={alt}
            className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none"
            fill
            loading="eager"
            sizes="(min-width: 1024px) 42vw, 100vw"
            src={src}
          />
        </div>
        <div className="flex flex-col justify-center p-space-xl sm:p-space-2xl">{children}</div>
      </article>
    </Link>
  )
}

export function ArticleProvenance({ children }: { readonly children: ReactNode }) {
  return (
    <aside className="rounded-lg border border-neutral-200 bg-surface p-space-lg shadow-card">
      {children}
    </aside>
  )
}

export function Tag({ children }: { readonly children: ReactNode }) {
  return (
    <span className="rounded-pill border border-border px-space-xs py-space-2xs font-mono text-tag text-muted">
      {children}
    </span>
  )
}

export function HeroMedia({
  alt,
  caption,
  src,
}: {
  readonly alt: string
  readonly caption: string
  readonly src: string
}) {
  return (
    <figure>
      <div className="relative min-h-media-hero-compact overflow-hidden rounded-lg border border-border bg-brand-100 shadow-card sm:min-h-media-hero">
        <Image
          alt={alt}
          className="object-cover"
          fill
          preload
          sizes="(min-width: 1024px) 40vw, 100vw"
          src={src}
        />
      </div>
      <figcaption className="mt-space-sm font-mono text-meta text-muted">{caption}</figcaption>
    </figure>
  )
}

export function HeroPlaceholder() {
  return (
    <figure aria-label="Atmospheric placeholder representing a cargo vessel at a harbor horizon">
      <div aria-hidden="true" className="hero-placeholder" />
      <figcaption className="mt-space-sm flex justify-between gap-space-md font-mono text-meta text-muted">
        <span>Atmospheric media placeholder</span>
        <span>For demonstrative use</span>
      </figcaption>
    </figure>
  )
}
