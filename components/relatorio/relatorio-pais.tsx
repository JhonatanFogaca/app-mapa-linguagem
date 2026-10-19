"use client"

import Link from "next/link"
import { Heart, Home, Lightbulb, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Personagem } from "@/components/personagem"
import { useCrianca } from "@/lib/crianca"
import { AVISO_TRIAGEM, DOMINIOS } from "@/lib/resultado"
import { BarraDominio } from "./barra-dominio"

export function RelatorioPais() {
  const { apelido, idade } = useCrianca()
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-6 md:py-10">
      <section className="flex flex-col items-center gap-3 rounded-3xl bg-ceu p-6 text-center">
        <Personagem nome="mari" altura={150} estado="comemorando" />
        <h1 className="text-balance font-heading text-3xl font-bold md:text-4xl">Parabéns, {apelido}!</h1>
        <p className="max-w-prose text-lg">
          {apelido}, de {idade} anos, completou a aventura com muita energia. Veja como foi a conversa.
        </p>
      </section>

      <section aria-labelledby="t-resumo" className="flex flex-col gap-3">
        <h2 id="t-resumo" className="flex items-center gap-2 font-heading text-2xl font-bold">
          <Heart className="size-6 text-rosa" aria-hidden="true" />O que vimos de bom
        </h2>
        <div className="flex flex-col gap-3">
          {DOMINIOS.map((d) => (
            <BarraDominio key={d.id} d={d} texto={d.simples} />
          ))}
        </div>
      </section>

      <section aria-labelledby="t-dicas" className="flex flex-col gap-3 rounded-3xl border-2 border-amarelo bg-amarelo/15 p-5">
        <h2 id="t-dicas" className="flex items-center gap-2 font-heading text-2xl font-bold">
          <Lightbulb className="size-6" aria-hidden="true" />Dicas para brincar em casa
        </h2>
        <ul className="flex list-disc flex-col gap-2 pl-5">
          {DOMINIOS.map((d) => (
            <li key={d.id}>{d.dica}</li>
          ))}
        </ul>
      </section>

      <p role="note" className="rounded-2xl bg-muted p-4 text-sm font-semibold">{AVISO_TRIAGEM}</p>

      <div className="flex flex-col gap-3 sm:flex-row print:hidden">
        <Button size="gordinho" className="flex-1" nativeButton={false} render={<Link href="/" />}>
          <Home aria-hidden="true" />Voltar ao início
        </Button>
        <Button size="gordinho" variant="outline" className="flex-1" onClick={() => window.print()}>
          <Printer aria-hidden="true" />Imprimir
        </Button>
      </div>
    </main>
  )
}
