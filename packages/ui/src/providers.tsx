'use client'

import { I18nProvider } from 'react-aria-components/I18nProvider'

export function UiProvider({ children }: { readonly children: React.ReactNode }) {
  return <I18nProvider locale="en-US">{children}</I18nProvider>
}
