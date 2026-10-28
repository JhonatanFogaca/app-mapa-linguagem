import type { Metadata } from "next"
import { SessaoConversa } from "@/components/sessao/sessao-conversa"
import { roteiroDaMissao } from "@/lib/roteiro-sessao"

type Props = { searchParams: Promise<{ missao?: string }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { missao } = await searchParams
  const roteiro = roteiroDaMissao(missao)
  return {
    title: `Conversa com a ${roteiro.rotulo} | Mapa da Linguagem`,
    description: `Ouça a ${roteiro.rotulo} e responda falando no microfone.`,
  }
}

export default async function PaginaSessao({ searchParams }: Props) {
  const { missao } = await searchParams
  const roteiro = roteiroDaMissao(missao)
  /* key: ao trocar de missão, a conversa recomeça do zero em vez de reaproveitar o estado. */
  return <SessaoConversa key={roteiro.personagem} roteiro={roteiro} />
}
