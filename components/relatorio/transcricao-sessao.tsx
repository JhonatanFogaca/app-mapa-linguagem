"use client"

import { Quote } from "lucide-react"
import { ROTEIRO, ROTEIROS, type PersonagemJogavel } from "@/lib/roteiro-sessao"
import { missoesJogadas, type Transcricao } from "@/lib/transcricao"

const ORDEM = Object.keys(ROTEIROS) as PersonagemJogavel[]

/* Resume de onde vieram as respostas de uma missão, para ninguém confundir simulado com voz real. */
function rotuloOrigem(origens: ("simulado" | "real")[]) {
  if (origens.every((o) => o === "simulado")) return "Respostas simuladas (modo de demonstração)"
  if (origens.every((o) => o === "real")) return "Voz real (texto transcrito pelo navegador)"
  return "Mistura de voz real e respostas simuladas"
}

export function TranscricaoSessao({ apelido, transcricao }: { apelido: string; transcricao: Transcricao }) {
  const jogadas = missoesJogadas(transcricao)

  return (
    <section aria-labelledby="t-trans" className="flex flex-col gap-4 rounded-3xl border-2 border-border bg-card p-4 sombra-suave md:p-5">
      <h2 id="t-trans" className="flex items-center gap-2 font-heading text-xl font-bold">
        <Quote className="size-5" aria-hidden="true" />
        {jogadas.length > 0 ? "Transcrição da sessão" : "Transcrição simulada (exemplo)"}
      </h2>

      {jogadas.length === 0 ? (
        <>
          <p className="text-sm text-muted-foreground">
            Nenhuma missão foi jogada nesta aba. Abaixo está a conversa de exemplo da Tata, toda simulada.
          </p>
          <ul className="flex flex-col gap-2">
            {ROTEIRO.map((p, i) => (
              <li key={i} className="rounded-2xl bg-muted px-4 py-2">
                <span className="font-bold">{apelido}:</span> {p.crianca}
              </li>
            ))}
          </ul>
        </>
      ) : (
        ORDEM.filter((m) => transcricao[m]).map((m) => {
          const respostas = transcricao[m] ?? []
          const roteiro = ROTEIROS[m]
          const incompleta = respostas.length < roteiro.trocas.length
          const misto = new Set(respostas.map((r) => r.origem)).size > 1
          return (
            <div key={m} className="flex flex-col gap-2">
              <h3 className="font-heading text-lg font-bold">
                {roteiro.rotulo} · {roteiro.tema}
              </h3>
              <p className="text-sm font-semibold text-muted-foreground">
                {rotuloOrigem(respostas.map((r) => r.origem))}
                {incompleta && ` · missão incompleta: ${respostas.length} de ${roteiro.trocas.length} respostas`}
              </p>
              <ol className="flex flex-col gap-2">
                {respostas.map((r, i) => (
                  <li key={i} className="flex flex-col gap-1 rounded-2xl bg-muted px-4 py-2">
                    <span className="text-sm text-muted-foreground">
                      {roteiro.rotulo}: {roteiro.trocas[i]?.tata}
                    </span>
                    <span>
                      <span className="font-bold">{apelido}:</span> {r.texto}
                      {misto && (
                        <span className="ml-2 text-xs font-semibold text-muted-foreground">
                          ({r.origem === "real" ? "voz real" : "simulada"})
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )
        })
      )}
    </section>
  )
}
