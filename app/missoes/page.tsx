import type { Metadata } from "next"
import { MapaComProgresso } from "@/components/missoes/mapa-com-progresso"
import { MISSOES } from "@/lib/missoes"

export const metadata: Metadata = {
  title: "Mapa de missões | Mapa da Linguagem",
  description: "Escolha a próxima missão e brinque com as personagens.",
}

export default async function PaginaMissoes({
  searchParams,
}: {
  searchParams: Promise<{ concluidas?: string }>
}) {
  const { concluidas } = await searchParams
  /* Sem parâmetro (ou inválido), vale o progresso guardado na sessão. */
  const numero = concluidas === undefined ? Number.NaN : Number.parseInt(concluidas, 10)
  const daUrl = Number.isFinite(numero) ? Math.min(Math.max(numero, 0), MISSOES.length) : null

  return <MapaComProgresso concluidasUrl={daUrl} />
}
