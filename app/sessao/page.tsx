import type { Metadata } from "next"
import { SessaoConversa } from "@/components/sessao/sessao-conversa"

export const metadata: Metadata = {
  title: "Conversa com a Tata | Mapa da Linguagem",
  description: "Ouça a história da Tata e responda falando no microfone.",
}

export default function PaginaSessao() {
  return <SessaoConversa />
}
