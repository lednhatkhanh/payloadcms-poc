'use client'

import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button as AriaButton } from 'react-aria-components/Button'
import { Form as AriaForm, type FormProps as AriaFormProps } from 'react-aria-components/Form'
import {
  FieldError,
  Input,
  Label,
  Text,
  TextArea,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from 'react-aria-components/TextField'
import {
  CheckboxButton as AriaCheckboxButton,
  CheckboxField as AriaCheckboxField,
  type CheckboxFieldProps as AriaCheckboxFieldProps,
} from 'react-aria-components/Checkbox'
import { Check } from 'lucide-react'
import { VisuallyHidden } from 'react-aria-components/VisuallyHidden'
import { ListBox, ListBoxItem } from 'react-aria-components/ListBox'
import { Popover } from 'react-aria-components/Popover'
import {
  Select as AriaSelect,
  SelectValue,
  type SelectProps as AriaSelectProps,
} from 'react-aria-components/Select'

const fieldStyles = cva('group flex flex-col gap-space-2xs text-body')
const labelStyles = cva('text-small font-semibold', {
  variants: {
    tone: {
      default: 'text-foreground',
      inverse: 'text-inverse',
    },
  },
  defaultVariants: { tone: 'default' },
})
const controlStyles = cva(
  'w-full rounded-md border px-space-md py-space-sm text-body outline-none transition rac-invalid:border-danger rac-invalid:ring-danger/15 rac-disabled:cursor-not-allowed rac-disabled:opacity-60',
  {
    variants: {
      tone: {
        default:
          'border-border bg-surface text-foreground placeholder:text-neutral-500 rac-hovered:border-neutral-500 rac-focused:border-brand-700 rac-focused:ring-2 rac-focused:ring-brand-200 rac-disabled:bg-neutral-100',
        inverse:
          'border-neutral-500 bg-neutral-900 text-inverse placeholder:text-inverse-muted rac-hovered:border-neutral-400 rac-focused:border-brand-300 rac-focused:ring-2 rac-focused:ring-brand-300 rac-disabled:bg-neutral-900',
      },
    },
    defaultVariants: { tone: 'default' },
  },
)
const checkboxButtonStyles = cva(
  'group flex cursor-default items-start gap-space-sm text-small rac-disabled:cursor-not-allowed rac-disabled:opacity-50',
  {
    variants: {
      tone: {
        default: 'text-muted',
        inverse: 'text-white',
      },
    },
    defaultVariants: { tone: 'default' },
  },
)
const selectStyles = cva('group relative flex flex-col gap-space-2xs', {
  variants: {
    size: {
      compact: 'w-fit',
      default: '',
    },
  },
  defaultVariants: { size: 'default' },
})
const selectButtonStyles = cva(
  'flex min-h-11 items-center gap-space-sm rounded-md border border-border bg-surface px-space-md py-space-sm text-small font-semibold text-foreground transition rac-hovered:border-neutral-500 rac-focused:border-brand-700 rac-focus-visible:outline-none rac-focus-visible:ring-2 rac-focus-visible:ring-brand-700 rac-focus-visible:ring-offset-2 rac-pressed:bg-brand-50',
  {
    variants: {
      size: {
        compact:
          'min-h-0 rounded-sm border-transparent bg-transparent px-space-xs py-space-2xs text-label rac-hovered:bg-brand-50 rac-hovered:text-brand-800',
        default: '',
      },
    },
    defaultVariants: { size: 'default' },
  },
)
const selectListStyles = cva(
  'max-h-64 min-w-(--trigger-width) overflow-auto rounded-md border border-border bg-surface p-space-2xs shadow-card outline-none',
)
const selectItemStyles = cva(
  'cursor-default rounded-sm px-space-md py-space-sm text-small text-foreground rac-focused:bg-brand-50 rac-selected:bg-brand-700 rac-selected:text-white',
)

export interface FormProps extends Omit<AriaFormProps, 'className' | 'style'> {}

export function Form(props: FormProps) {
  return <AriaForm {...props} className="flex flex-col gap-space-lg" />
}

export function FormActionRow({ children }: { readonly children: ReactNode }) {
  return (
    <div className="grid items-end gap-space-footer-field sm:grid-cols-form-action">{children}</div>
  )
}

interface SharedFieldProps {
  readonly description?: string
  readonly errorMessage?: string | ((validation: ValidationResult) => string)
  readonly label: string
}

export interface TextFieldProps
  extends Omit<AriaTextFieldProps, 'children' | 'className' | 'style'>, SharedFieldProps {
  readonly placeholder?: string
  readonly tone?: 'default' | 'inverse'
}

export function TextField({
  description,
  errorMessage,
  label,
  placeholder,
  tone,
  ...props
}: TextFieldProps) {
  const needsAccessibleName =
    props['aria-label'] === undefined && props['aria-labelledby'] === undefined

  return (
    <AriaTextField
      {...props}
      {...(needsAccessibleName ? { 'aria-label': label } : {})}
      className={fieldStyles()}
    >
      <Label
        className={
          tone === 'inverse'
            ? 'font-mono text-meta font-bold uppercase tracking-label text-inverse'
            : labelStyles({ tone })
        }
      >
        {label}
      </Label>
      <Input
        className={controlStyles({ tone })}
        {...(placeholder === undefined ? {} : { placeholder })}
      />
      {description ? (
        <Text
          className={tone === 'inverse' ? 'text-small text-inverse-muted' : 'text-small text-muted'}
          slot="description"
        >
          {description}
        </Text>
      ) : null}
      <FieldError className="text-small font-semibold text-danger">{errorMessage}</FieldError>
    </AriaTextField>
  )
}

export interface TextAreaFieldProps
  extends Omit<AriaTextFieldProps, 'children' | 'className' | 'style'>, SharedFieldProps {
  readonly rows?: number
}

export function TextAreaField({
  description,
  errorMessage,
  label,
  rows = 6,
  ...props
}: TextAreaFieldProps) {
  const needsAccessibleName =
    props['aria-label'] === undefined && props['aria-labelledby'] === undefined

  return (
    <AriaTextField
      {...props}
      {...(needsAccessibleName ? { 'aria-label': label } : {})}
      className={fieldStyles()}
    >
      <Label className="text-small font-semibold text-foreground">{label}</Label>
      <TextArea className={controlStyles()} rows={rows} />
      {description ? (
        <Text className="text-small text-muted" slot="description">
          {description}
        </Text>
      ) : null}
      <FieldError className="text-small font-semibold text-danger">{errorMessage}</FieldError>
    </AriaTextField>
  )
}

export interface CheckboxFieldProps
  extends Omit<AriaCheckboxFieldProps, 'children' | 'className' | 'style'>, SharedFieldProps {
  readonly tone?: 'default' | 'inverse'
}

export function CheckboxField({
  description,
  errorMessage,
  label,
  tone,
  ...props
}: CheckboxFieldProps) {
  return (
    <AriaCheckboxField {...props} className={fieldStyles()}>
      <AriaCheckboxButton className={checkboxButtonStyles({ tone })}>
        {({ isSelected }) => (
          <>
            <span className="mt-space-2xs flex size-5 shrink-0 items-center justify-center rounded-sm border border-neutral-500 bg-surface text-white transition group-rac-selected:border-brand-700 group-rac-selected:bg-brand-700 group-rac-focus-visible:ring-2 group-rac-focus-visible:ring-brand-700 group-rac-focus-visible:ring-offset-2">
              {isSelected ? (
                <Check aria-hidden="true" className="size-4" strokeWidth={2.25} />
              ) : null}
            </span>
            <span>{label}</span>
          </>
        )}
      </AriaCheckboxButton>
      {description ? (
        <Text className="pl-space-xl text-small text-muted" slot="description">
          {description}
        </Text>
      ) : null}
      <FieldError className="pl-space-xl text-small font-semibold text-danger">
        {errorMessage}
      </FieldError>
    </AriaCheckboxField>
  )
}

export interface SelectFieldOption {
  readonly label: string
  readonly value: string
}

export interface SelectFieldProps extends Omit<
  AriaSelectProps<object>,
  'children' | 'className' | 'style'
> {
  readonly label: string
  readonly options: readonly SelectFieldOption[]
  readonly size?: 'compact' | 'default'
}

export function SelectField({ label, options, size, ...props }: SelectFieldProps) {
  return (
    <AriaSelect {...props} aria-label={label} className={selectStyles({ size })}>
      {size === 'compact' ? (
        <VisuallyHidden>
          <Label>{label}</Label>
        </VisuallyHidden>
      ) : (
        <Label className={labelStyles()}>{label}</Label>
      )}
      <AriaButton className={selectButtonStyles({ size })}>
        <SelectValue className="flex-1 text-left" />
        <ChevronDown aria-hidden="true" className="size-4" strokeWidth={2} />
      </AriaButton>
      <Popover className="min-w-(--trigger-width)">
        <ListBox className={selectListStyles()}>
          {options.map((option) => (
            <ListBoxItem className={selectItemStyles()} id={option.value} key={option.value}>
              {option.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </AriaSelect>
  )
}

export function HoneypotField({ name = 'website' }: { readonly name?: string }) {
  return (
    <VisuallyHidden>
      <AriaTextField aria-label="Leave this field empty" name={name}>
        <Input autoComplete="off" tabIndex={-1} />
      </AriaTextField>
    </VisuallyHidden>
  )
}
