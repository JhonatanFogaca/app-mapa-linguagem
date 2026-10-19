"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  titulo: string
  onVoltar: () => void
  children: ReactNode
}

export function MolduraTela({ titulo, onVoltar, children }: Props) {
  const tituloRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    tituloRef.current?.focus()
  }, [])

  return (
    <section className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-5 px-4 py-6 md:py-10">
      <Button
        variant="ghost"
        onClick={onVoltar}
        className="h-11 self-start gap-2 rounded-2xl px-3 text-base"
      >
        <ArrowLeft className="size-5" aria-hidden="true" />
        Voltar
      </Button>
      <h1
        ref={tituloRef}
        tabIndex={-1}
        className="text-balance font-heading text-3xl font-bold text-foreground outline-none md:text-4xl"
      >
        {titulo}
      </h1>
      {children}
    </section>
  )
}
