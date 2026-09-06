'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components/Button'
import { composeRenderProps } from 'react-aria-components/composeRenderProps'

export const buttonStyles = cva(
  'relative inline-flex min-h-11 cursor-default items-center justify-center gap-space-xs rounded-md border font-semibold transition duration-150 [-webkit-tap-highlight-color:transparent] rac-focus-visible:outline-none rac-focus-visible:ring-2 rac-focus-visible:ring-brand-700 rac-focus-visible:ring-offset-2 rac-focus-visible:ring-offset-page rac-disabled:cursor-not-allowed rac-disabled:opacity-45',
  {
    variants: {
      size: {
        sm: 'px-space-md text-small',
        md: 'px-space-lg text-body',
        lg: 'min-h-12 px-space-xl text-body',
        newsletter: 'min-h-12 px-space-footer-button text-body',
      },
      variant: {
        primary:
          'border-brand-700 bg-brand-700 text-white rac-hovered:border-brand-800 rac-hovered:bg-brand-800 rac-pressed:border-brand-900 rac-pressed:bg-brand-900',
        secondary:
          'border-border bg-surface text-foreground rac-hovered:border-brand-300 rac-hovered:bg-brand-50 rac-pressed:bg-brand-100',
        quiet:
          'border-transparent bg-transparent text-foreground rac-hovered:bg-neutral-100 rac-pressed:bg-neutral-200',
        navigation:
          'border-border bg-surface text-foreground md:hidden rac-hovered:border-brand-300 rac-hovered:bg-brand-50 rac-pressed:bg-brand-100',
        danger:
          'border-danger bg-danger text-white rac-hovered:brightness-90 rac-pressed:brightness-75',
      },
    },
    defaultVariants: { size: 'md', variant: 'primary' },
  },
)

type ButtonVariants = VariantProps<typeof buttonStyles>

export interface ButtonProps extends Omit<AriaButtonProps, 'className' | 'style'>, ButtonVariants {}

export function Button({ children, size, variant, ...props }: ButtonProps) {
  return (
    <AriaButton {...props} className={buttonStyles({ size, variant })}>
      {composeRenderProps(children, (content, { isPending }) => (
        <>
          <span
            className={
              isPending
                ? 'inline-flex items-center justify-center gap-space-xs opacity-0'
                : 'inline-flex items-center justify-center gap-space-xs'
            }
          >
            {content}
          </span>
          {isPending ? (
            <LoaderCircle
              aria-hidden="true"
              className="absolute size-5 animate-spin motion-reduce:animate-none"
              strokeWidth={1.75}
            />
          ) : null}
        </>
      ))}
    </AriaButton>
  )
}
