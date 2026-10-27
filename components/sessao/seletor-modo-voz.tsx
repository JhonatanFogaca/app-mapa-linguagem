"use client"

import { cn } from "@/lib/utils"

export type ModoVoz = "simulado" | "real"

type Props = {
  modo: ModoVoz
  onMudar: (modo: ModoVoz) => void
  vozDisponivel: boolean
  desabilitado: boolean
}

const OPCOES: { valor: ModoVoz; rotulo: string }[] = [
  { valor: "simulado", rotulo: "Simulado" },
  { valor: "real", rotulo: "Voz real" },
]

export function SeletorModoVoz({ modo, onMudar, vozDisponivel, desabilitado }: Props) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div role="group" aria-label="Modo da conversa" className="flex rounded-full border-2 border-border bg-card p-1">
        {OPCOES.map(({ valor, rotulo }) => {
          const ativo = modo === valor
          const bloqueado = desabilitado || (valor === "real" && !vozDisponivel)
          return (
            <button
              key={valor}
              type="button"
              aria-pressed={ativo}
              disabled={bloqueado}
              onClick={() => onMudar(valor)}
              className={cn(
                "min-h-11 min-w-28 rounded-full px-4 text-sm font-bold outline-none transition-colors focus-visible:ring-4 focus-visible:ring-ring/40",
                ativo ? "bg-tata text-white" : "text-muted-foreground hover:bg-muted",
                bloqueado && !ativo && "cursor-not-allowed opacity-50",
              )}
            >
              {rotulo}
            </button>
          )
        })}
      </div>

      {modo === "simulado" ? (
        <p className="max-w-md text-pretty text-sm text-muted-foreground">
          Modo simulado: as respostas da criança são de exemplo e nenhum áudio é captado.
        </p>
      ) : (
        <p className="max-w-md text-pretty text-sm text-muted-foreground">
          Voz real: o navegador usa o microfone. No Chrome, o áudio pode ser enviado a um serviço do Google para virar texto.
          Use só com autorização do responsável.
        </p>
      )}
      {!vozDisponivel && (
        <p className="max-w-md text-pretty text-sm text-muted-foreground">
          Este navegador não tem reconhecimento de voz. Para testar a voz real, use o Chrome.
        </p>
      )}
    </div>
  )
}
