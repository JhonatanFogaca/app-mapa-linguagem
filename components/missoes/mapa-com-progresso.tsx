"use client"

import { useEffect } from "react"
import { MapaMissoes } from "@/components/missoes/mapa-missoes"
import { definirProgresso, useProgresso } from "@/lib/progresso"

/*
 * O progresso vem da sessão do navegador. O atalho ?concluidas=N (útil para ensaiar a demonstração)
 * tem prioridade e também grava o valor, então ?concluidas=0 reinicia o mapa.
 */
export function MapaComProgresso({ concluidasUrl }: { concluidasUrl: number | null }) {
  const salvo = useProgresso()

  useEffect(() => {
    if (concluidasUrl !== null) definirProgresso(concluidasUrl)
  }, [concluidasUrl])

  return <MapaMissoes concluidas={concluidasUrl ?? salvo} />
}
