import type { Metadata } from "next"
import { RelatorioProfissional } from "@/components/relatorio/relatorio-profissional"

export const metadata: Metadata = {
  title: "Relatório profissional | Mapa da Linguagem",
  description: "Perfil por domínio de linguagem, com gráfico e transcrição simulada.",
}

export default function PaginaRelatorioProfissional() {
  return <RelatorioProfissional />
}
