"use client"

import { useEffect } from "react"
import { MapaMissoes } from "@/components/missoes/mapa-missoes"
import { definirProgresso, useProgresso } from "@/lib/progresso"
import { reiniciarTranscricao } from "@/lib/transcricao"

/*
 * O progresso vem da sessão do navegador. O atalho ?concluidas=N (útil para ensaiar a demonstração)
 * tem prioridade e também grava o valor, então ?concluidas=0 reinicia o mapa (e a transcrição).
 */
export function MapaComProgresso({ concluidasUrl }: { concluidasUrl: number | null }) {
  const salvo = useProgresso()

  useEffect(() => {
    if (concluidasUrl === null) return
    definirProgresso(concluidasUrl)
    if (concluidasUrl === 0) reiniciarTranscricao()
  }, [concluidasUrl])

  return <MapaMissoes concluidas={concluidasUrl ?? salvo} />
}
