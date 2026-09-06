'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function previewMessageType(value: unknown): string | undefined {
  if (typeof value !== 'object' || value === null || !('type' in value)) return undefined
  return typeof value.type === 'string' ? value.type : undefined
}

export function LivePreviewRefresh({ sourceOrigin }: { readonly sourceOrigin: string }) {
  const router = useRouter()

  useEffect(() => {
    let refreshTimer: ReturnType<typeof setTimeout> | undefined
    const refresh = () => {
      if (refreshTimer) clearTimeout(refreshTimer)
      refreshTimer = setTimeout(() => router.refresh(), 200)
    }
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== sourceOrigin) return
      if (previewMessageType(event.data) === 'payload-document-event') refresh()
    }

    const readyMessage = { ready: true, type: 'payload-live-preview' }
    if (window.parent !== window) window.parent.postMessage(readyMessage, sourceOrigin)
    if (window.opener) window.opener.postMessage(readyMessage, sourceOrigin)

    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
      if (refreshTimer) clearTimeout(refreshTimer)
    }
  }, [router, sourceOrigin])

  return null
}
