"use client"

import { useCallback, useSyncExternalStore } from "react"

export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const lista = window.matchMedia(query)
      lista.addEventListener("change", callback)
      return () => lista.removeEventListener("change", callback)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}
