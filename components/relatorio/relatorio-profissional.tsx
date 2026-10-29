"use client"

import Link from "next/link"
import { Download, Home, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCrianca, useDataHoje } from "@/lib/crianca"
import { AVISO_TRIAGEM, DOMINIOS, situacao } from "@/lib/resultado"
import { ROTEIROS } from "@/lib/roteiro-sessao"
import { missoesJogadas, useTranscricao } from "@/lib/transcricao"
import { BarraDominio } from "./barra-dominio"
import { GraficoRadar } from "./grafico-radar"
import { TranscricaoSessao } from "./transcricao-sessao"

export function RelatorioProfissional() {
  const { apelido, idade } = useCrianca()
  const data = useDataHoje()
  const transcricao = useTranscricao()
  const jogadas = missoesJogadas(transcricao)
  const atencao = DOMINIOS.filter((d) => situacao(d) === "atencao")
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 md:px-6 md:py-10">
      <header className="flex flex-col gap-1">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">Relatório profissional</p>
        <h1 className="font-heading text-3xl font-bold md:text-4xl">Triagem de linguagem — {apelido}</h1>
        <p className="text-muted-foreground">
          {idade} anos ·{" "}
          {jogadas.length > 0
            ? `Missões jogadas: ${jogadas.map((m) => ROTEIROS[m].rotulo).join(", ")}`
            : "Sessão de exemplo (nenhuma missão jogada)"}
          {data && ` · ${data}`}
        </p>
        <p role="note" className="mt-1 rounded-2xl bg-amarelo/15 px-3 py-2 text-sm font-semibold">
          Pontuações e textos dos domínios são fictícios, de demonstração: ainda não são calculados a partir da fala da criança.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <section aria-labelledby="t-perfil" className="rounded-3xl border-2 border-border bg-card p-4 sombra-suave md:p-5">
          <h2 id="t-perfil" className="font-heading text-xl font-bold">Perfil por domínio</h2>
          <GraficoRadar />
        </section>
        <section aria-labelledby="t-sintese" className="flex flex-col gap-3 rounded-3xl border-2 border-border bg-card p-4 sombra-suave md:p-5">
          <h2 id="t-sintese" className="font-heading text-xl font-bold">Síntese</h2>
          <p>
            {DOMINIOS.length - atencao.length} de {DOMINIOS.length} domínios dentro da faixa esperada para a idade.
            {atencao.length > 0 && ` Pontos de atenção: ${atencao.map((d) => d.nome.toLowerCase()).join(", ")}.`}
          </p>
          <p className="text-sm text-muted-foreground">Sugestão: reavaliar vocabulário com tarefa de nomeação e categorização.</p>
        </section>
      </div>

      <section aria-labelledby="t-dominios" className="flex flex-col gap-3">
        <h2 id="t-dominios" className="font-heading text-2xl font-bold">Análise por domínio</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {DOMINIOS.map((d) => (
            <BarraDominio key={d.id} d={d} texto={d.tecnico} />
          ))}
        </div>
      </section>

      <TranscricaoSessao apelido={apelido} transcricao={transcricao} />

      <p role="note" className="rounded-2xl bg-muted p-4 text-sm font-semibold">{AVISO_TRIAGEM}</p>

      <div className="flex flex-col gap-3 sm:flex-row print:hidden">
        <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/" />}><Home aria-hidden="true" />Início</Button>
        <Button size="lg" variant="outline" onClick={() => window.print()}><Printer aria-hidden="true" />Imprimir</Button>
        <Button size="lg" onClick={() => window.print()}><Download aria-hidden="true" />Salvar como PDF</Button>
      </div>
    </main>
  )
}
