"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Lock, Star } from "lucide-react"
import { Personagem, type EstadoPersonagem } from "@/components/personagem"
import { INFO_PERSONAGEM } from "@/lib/personagens"
import type { Missao, StatusMissao } from "@/lib/missoes"
import { cn } from "@/lib/utils"

type Props = {
  missao: Missao
  numero: number
  status: StatusMissao
}

export function ParadaMissao({ missao, numero, status }: Props) {
  const info = INFO_PERSONAGEM[missao.personagem]
  const liberada = status === "liberada"
  const bloqueada = status === "bloqueada"
  const concluida = status === "concluida"
  const [estado, setEstado] = useState<EstadoPersonagem>(liberada ? "entrando" : "parado")

  useEffect(() => {
    if (!liberada) return
    const t = setTimeout(() => setEstado("parado"), 1000)
    return () => clearTimeout(t)
  }, [liberada])

  /* No protótipo só a conversa com a Tata existe; as outras paradas ficam como "Em breve". */
  const jogavel = missao.personagem === "tata"
  const descricaoStatus = concluida ? "concluída" : liberada ? "liberada" : "bloqueada"

  const conteudo = (
    <>
      <div className="relative flex flex-col items-center">
        <div className={cn("relative z-10 transition-[filter,opacity]", bloqueada && "opacity-60 grayscale")}>
          <Personagem nome={missao.personagem} altura={120} estado={estado} />
        </div>
        <span
          className={cn(
            "-mt-4 h-6 w-24 rounded-[50%] border-4 border-card",
            bloqueada ? "bg-muted-foreground/30" : info.fundo,
          )}
          aria-hidden="true"
        />
        {bloqueada && (
          <span className="absolute right-0 top-8 z-20 flex size-9 items-center justify-center rounded-full border-4 border-card bg-tinta text-card">
            <Lock className="size-4" aria-hidden="true" />
          </span>
        )}
        {liberada && (
          <span className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 animate-bounce rounded-full bg-tata px-3 py-1 font-heading text-xs font-bold text-white sombra-gordinha [--cor-sombra:var(--tata)] motion-reduce:animate-none">
            {jogavel ? "Começar" : "Em breve"}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center gap-2 rounded-2xl border-2 border-border bg-card px-3 py-1.5 sombra-suave">
        <Star
          className={cn(
            "size-5 transition-colors",
            concluida ? "fill-mari text-mari" : "fill-muted text-muted-foreground/40",
          )}
          aria-hidden="true"
        />
        <span className="flex flex-col leading-tight">
          <span className={cn("font-heading text-base font-bold", bloqueada && "text-muted-foreground")}>
            {info.rotulo}
          </span>
          <span className="text-xs font-semibold text-muted-foreground">{missao.tema}</span>
        </span>
      </div>
    </>
  )

  const rotuloAcessivel = `Missão ${numero}: ${info.rotulo}, ${missao.tema}, ${descricaoStatus}`

  return (
    <li
      className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
      style={{ left: `${missao.x}%`, top: `${missao.y}%` }}
    >
      {liberada && jogavel ? (
        <Link
          href="/sessao"
          aria-label={`${rotuloAcessivel}. Começar missão`}
          className="flex flex-col items-center rounded-3xl p-2 outline-none transition-transform hover:scale-105 focus-visible:ring-4 focus-visible:ring-ring/50"
        >
          {conteudo}
        </Link>
      ) : (
        <div
          aria-label={liberada ? `${rotuloAcessivel}. Em breve` : rotuloAcessivel}
          role="group"
          aria-disabled={!concluida}
          className="flex flex-col items-center p-2"
        >
          {conteudo}
        </div>
      )}
    </li>
  )
}
