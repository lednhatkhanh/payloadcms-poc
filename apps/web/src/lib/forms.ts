import type { FormFieldErrors } from '@repo/contracts/forms'
import { mapValues } from 'es-toolkit'

export function mutableFieldErrors(errors: FormFieldErrors): Record<string, string[]> {
  return mapValues(errors, (messages) => [...messages])
}
