import { MolduraTela } from "./moldura-tela"

export function TelaRelatorioEmBreve({ onVoltar }: { onVoltar: () => void }) {
  return (
    <MolduraTela titulo="Relatório em breve" onVoltar={onVoltar}>
      <div className="flex-1" />
    </MolduraTela>
  )
}
