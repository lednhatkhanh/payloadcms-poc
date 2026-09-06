import { twMerge } from 'tailwind-merge'

export function mergeClasses(...classes: ReadonlyArray<string | false | null | undefined>): string {
  return twMerge(classes.filter(Boolean).join(' '))
}
