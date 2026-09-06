import { cva, type VariantProps } from 'class-variance-authority'
import type { ElementType, ReactNode } from 'react'

const containerStyles = cva('site-container mx-auto w-full px-space-lg sm:px-space-xl', {
  variants: {
    size: { content: 'max-w-3xl', wide: 'max-w-7xl' },
  },
  defaultVariants: { size: 'wide' },
})

const stackStyles = cva('flex flex-col', {
  variants: {
    gap: {
      none: 'gap-0',
      '2xs': 'gap-space-2xs',
      xs: 'gap-space-xs',
      sm: 'gap-space-sm',
      md: 'gap-space-md',
      lg: 'gap-space-lg',
      xl: 'gap-space-xl',
      '2xl': 'gap-space-2xl',
      '3xl': 'gap-space-3xl',
    },
  },
  defaultVariants: { gap: 'md' },
})

const sectionStyles = cva('', {
  variants: {
    space: {
      compact: 'py-space-2xl',
      default: 'py-space-section',
      hero: 'py-space-section lg:py-space-hero',
    },
  },
  defaultVariants: { space: 'default' },
})

const surfaceStyles = cva('', {
  variants: {
    border: {
      none: 'border-0',
      subtle: 'border border-neutral-200',
      default: 'border border-border',
      strong: 'border border-neutral-500',
      brand: 'border border-brand-700',
    },
    padding: {
      none: 'p-0',
      sm: 'p-space-md',
      md: 'p-space-lg',
      lg: 'p-space-xl sm:p-space-2xl',
    },
    radius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      pill: 'rounded-pill',
    },
    tone: {
      page: 'bg-page',
      surface: 'bg-surface',
      soft: 'bg-surface-soft',
      brand: 'bg-brand-700 text-white',
      ink: 'bg-neutral-950 text-white',
    },
  },
  defaultVariants: { border: 'none', padding: 'none', radius: 'none', tone: 'surface' },
})

interface BaseProps {
  readonly as?: ElementType
  readonly children: ReactNode
  readonly id?: string
}

export interface ContainerProps extends BaseProps, VariantProps<typeof containerStyles> {}
export function Container({ as: Component = 'div', children, id, size }: ContainerProps) {
  return (
    <Component className={containerStyles({ size })} id={id}>
      {children}
    </Component>
  )
}

export interface StackProps extends BaseProps, VariantProps<typeof stackStyles> {}
export function Stack({ as: Component = 'div', children, gap, id }: StackProps) {
  return (
    <Component className={stackStyles({ gap })} id={id}>
      {children}
    </Component>
  )
}

const clusterStyles = cva('flex flex-wrap items-center gap-space-md', {
  variants: {
    justify: { start: 'justify-start', between: 'justify-between', center: 'justify-center' },
    padding: { none: 'py-0', md: 'py-space-md', lg: 'py-space-lg' },
  },
  defaultVariants: { justify: 'start', padding: 'none' },
})

export interface ClusterProps extends BaseProps, VariantProps<typeof clusterStyles> {}
export function Cluster({ as: Component = 'div', children, id, justify, padding }: ClusterProps) {
  return (
    <Component className={clusterStyles({ justify, padding })} id={id}>
      {children}
    </Component>
  )
}

export interface SectionProps extends BaseProps, VariantProps<typeof sectionStyles> {}
export function Section({ as: Component = 'section', children, id, space }: SectionProps) {
  return (
    <Component className={sectionStyles({ space })} id={id}>
      {children}
    </Component>
  )
}

export function NewsGrid({ children }: { readonly children: ReactNode }) {
  return <div className="grid gap-space-lg md:grid-cols-2">{children}</div>
}

export function Split({ children }: { readonly children: ReactNode }) {
  return <div className="grid items-start gap-space-2xl lg:grid-cols-split">{children}</div>
}

export function EditorialRule() {
  return <div aria-hidden="true" className="h-px w-full bg-neutral-300" />
}

export function StatGrid({ children }: { readonly children: ReactNode }) {
  return <div className="grid gap-space-md sm:grid-cols-3">{children}</div>
}

export function HomeHeroGrid({ children }: { readonly children: ReactNode }) {
  return (
    <div className="grid items-center gap-space-2xl lg:grid-cols-home-hero lg:gap-space-3xl">
      {children}
    </div>
  )
}

export function HeroContent({ children }: { readonly children: ReactNode }) {
  return <div className="hero-content">{children}</div>
}

export function SectionHeading({ children }: { readonly children: ReactNode }) {
  return <div className="section-heading">{children}</div>
}

export function EnquiryHeading({ children }: { readonly children: ReactNode }) {
  return <div className="enquiry-heading">{children}</div>
}

export function SectionIntro({ children }: { readonly children: ReactNode }) {
  return (
    <div className="grid items-end gap-space-xl lg:grid-cols-section-intro lg:gap-space-2xl">
      {children}
    </div>
  )
}

export function DispatchHeader({ children }: { readonly children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-space-xl lg:flex-row lg:items-end lg:justify-between">
      {children}
    </div>
  )
}

export function FeatureGrid({ children }: { readonly children: ReactNode }) {
  return <div className="grid gap-space-lg md:grid-cols-3">{children}</div>
}

export function LocationGrid({ children }: { readonly children: ReactNode }) {
  return (
    <div className="grid items-stretch gap-space-lg md:grid-cols-2 lg:grid-cols-3">{children}</div>
  )
}

export function LocationToolbar({ children }: { readonly children: ReactNode }) {
  return (
    <div className="flex flex-col gap-space-lg border-y border-border py-space-xl lg:flex-row lg:items-center lg:justify-between">
      {children}
    </div>
  )
}

export function FilterGroup({ children }: { readonly children: ReactNode }) {
  return <div className="flex flex-wrap gap-space-sm">{children}</div>
}

export function FilterSet({
  children,
  label,
}: {
  readonly children: ReactNode
  readonly label: string
}) {
  return (
    <div className="flex flex-col gap-space-xs">
      <span className="text-label font-semibold tracking-label text-muted uppercase">{label}</span>
      <FilterGroup>{children}</FilterGroup>
    </div>
  )
}

export function LocationDetailGrid({ children }: { readonly children: ReactNode }) {
  return (
    <div className="grid items-start gap-space-2xl lg:grid-cols-location-detail lg:gap-space-3xl">
      {children}
    </div>
  )
}

export function ArticleLayout({ children }: { readonly children: ReactNode }) {
  return (
    <div className="grid items-start gap-space-2xl lg:grid-cols-article lg:gap-space-3xl">
      {children}
    </div>
  )
}

export function ServiceGrid({ children }: { readonly children: ReactNode }) {
  return <div className="grid border-t border-border md:grid-cols-3">{children}</div>
}

export function EditorialGrid({ children }: { readonly children: ReactNode }) {
  return <div className="grid gap-space-lg lg:grid-cols-editorial">{children}</div>
}

export function EnquiryGrid({ children }: { readonly children: ReactNode }) {
  return (
    <div className="grid items-start gap-space-2xl border-y border-border py-space-enquiry lg:grid-cols-enquiry lg:gap-space-3xl">
      {children}
    </div>
  )
}

export function NewsletterGrid({ children }: { readonly children: ReactNode }) {
  return <div className="grid gap-space-2xl lg:grid-cols-newsletter">{children}</div>
}

export function NewsletterFormLayout({ children }: { readonly children: ReactNode }) {
  return <div className="self-end">{children}</div>
}

export function FooterContent({ children }: { readonly children: ReactNode }) {
  return <div className="pb-space-footer-bottom pt-space-footer-top">{children}</div>
}

export function FooterMeta({ children }: { readonly children: ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-space-md border-t border-neutral-700 pt-space-lg sm:flex-row">
      {children}
    </div>
  )
}

export function SiteHeaderFrame({ children }: { readonly children: ReactNode }) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface/95 backdrop-blur-md">
      {children}
    </header>
  )
}

export function SiteBrand({ children }: { readonly children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-space-sm font-mono text-label font-bold uppercase tracking-label">
      <span aria-hidden="true" className="h-space-xs w-space-lg border-y-2 border-foreground" />
      {children}
    </span>
  )
}

export function HeaderBar({ children }: { readonly children: ReactNode }) {
  return (
    <div className="relative flex min-h-header items-center justify-between gap-space-md py-space-md">
      {children}
    </div>
  )
}

export function HeaderNavigation({
  children,
  isOpen = false,
}: {
  readonly children: ReactNode
  readonly isOpen?: boolean
}) {
  return (
    <nav
      aria-label="Primary navigation"
      className="absolute inset-x-0 top-full hidden flex-col items-stretch gap-space-md rounded-lg border border-border bg-surface p-space-md shadow-card data-[open=true]:flex md:static md:flex md:flex-row md:items-center md:gap-space-lg md:border-0 md:bg-transparent md:p-0 md:shadow-none"
      data-open={isOpen || undefined}
    >
      {children}
    </nav>
  )
}

export interface SurfaceProps extends BaseProps, VariantProps<typeof surfaceStyles> {}
export function Surface({
  as: Component = 'div',
  border,
  children,
  id,
  padding,
  radius,
  tone,
}: SurfaceProps) {
  return (
    <Component className={surfaceStyles({ border, padding, radius, tone })} id={id}>
      {children}
    </Component>
  )
}
