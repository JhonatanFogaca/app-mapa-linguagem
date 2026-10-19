import type { Metadata } from "next"
import { RelatorioPais } from "@/components/relatorio/relatorio-pais"

export const metadata: Metadata = {
  title: "Relatório para os pais | Mapa da Linguagem",
  description: "Resumo simples da conversa e dicas para brincar em casa.",
}

export default function PaginaRelatorioPais() {
  return <RelatorioPais />
}
