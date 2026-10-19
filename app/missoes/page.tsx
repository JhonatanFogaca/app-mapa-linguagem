import type { Metadata } from "next"
import { MapaMissoes } from "@/components/missoes/mapa-missoes"
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
  const numero = Number.parseInt(concluidas ?? "0", 10)
  const total = Number.isFinite(numero) ? Math.min(Math.max(numero, 0), MISSOES.length) : 0

  return <MapaMissoes concluidas={total} />
}
