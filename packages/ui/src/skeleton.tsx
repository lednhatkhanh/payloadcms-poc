import { cva, type VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'

const skeletonStyles = cva('skeleton-surface shrink-0 motion-reduce:animate-none', {
  variants: {
    radius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      pill: 'rounded-pill',
    },
    size: {
      label: 'h-space-sm',
      text: 'h-space-md',
      lead: 'h-space-lg',
      title: 'h-space-2xl',
      display: 'h-space-3xl',
      control: 'h-space-2xl',
      storyMedia: 'h-media-story',
      locationMedia: 'h-media-location',
      locationDetailMedia: 'min-h-media-location-detail',
      heroMedia: 'min-h-media-hero-compact sm:min-h-media-hero',
    },
    width: {
      short: 'w-1/4',
      medium: 'w-1/2',
      long: 'w-3/4',
      full: 'w-full',
      control: 'w-skeleton-control',
      controlWide: 'w-skeleton-control-wide',
    },
  },
  defaultVariants: { radius: 'sm', size: 'text', width: 'full' },
})

const skeletonCardStyles = cva(
  'flex h-full flex-col justify-between overflow-hidden rounded-lg border border-neutral-200 bg-surface p-space-lg shadow-card',
  {
    variants: {
      size: {
        compact: '',
        location: 'min-h-card-location p-0',
        story: 'min-h-card-story',
        featured: 'min-h-card-story-featured bg-surface-soft',
      },
    },
    defaultVariants: { size: 'story' },
  },
)

export interface SkeletonProps extends VariantProps<typeof skeletonStyles> {}

export function Skeleton({ radius, size, width }: SkeletonProps) {
  return <div className={skeletonStyles({ radius, size, width })} />
}

export function SkeletonStatus({
  children,
  label,
}: {
  readonly children: ReactNode
  readonly label: string
}) {
  return (
    <div aria-busy="true">
      <output aria-label={label} aria-live="polite" className="sr-only">
        {label}
      </output>
      <div aria-hidden="true">{children}</div>
    </div>
  )
}

export function SkeletonCard({
  children,
  size,
}: {
  readonly children: ReactNode
  readonly size?: VariantProps<typeof skeletonCardStyles>['size']
}) {
  return <div className={skeletonCardStyles({ size })}>{children}</div>
}

export function SkeletonFeaturedCard({ children }: { readonly children: ReactNode }) {
  return (
    <div className="grid min-h-card-story-featured overflow-hidden rounded-lg border border-neutral-200 bg-surface-soft shadow-card lg:grid-cols-featured-story">
      <Skeleton radius="none" size="locationDetailMedia" />
      <div className="flex flex-col justify-center p-space-xl sm:p-space-2xl">{children}</div>
    </div>
  )
}
