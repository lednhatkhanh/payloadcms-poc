import { cva, type VariantProps } from 'class-variance-authority'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  ExternalLink,
  LoaderCircle,
  Mail,
  Menu,
  Send,
  Sparkles,
  X,
  type LucideIcon,
} from 'lucide-react'

export {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  ExternalLink,
  LoaderCircle,
  Mail,
  Menu,
  Send,
  Sparkles,
  X,
}

const iconStyles = cva('shrink-0', {
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
    },
    tone: {
      current: 'text-current',
      brand: 'text-brand-700',
      muted: 'text-muted',
      danger: 'text-danger',
      inverse: 'text-white',
    },
  },
  defaultVariants: { size: 'md', tone: 'current' },
})

type IconVariants = VariantProps<typeof iconStyles>

export interface IconProps extends IconVariants {
  readonly label?: string
  readonly source: LucideIcon
}

export function Icon({ label, size, source: Source, tone }: IconProps) {
  const accessibility = label
    ? ({ 'aria-label': label, role: 'img' } as const)
    : ({ 'aria-hidden': true } as const)

  return (
    <Source
      {...accessibility}
      absoluteStrokeWidth
      className={iconStyles({ size, tone })}
      strokeWidth={1.75}
    />
  )
}
