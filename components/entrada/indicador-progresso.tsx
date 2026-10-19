import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const PASSOS = ["Boas-vindas", "Consentimento", "Cadastro"]

export function IndicadorProgresso({ passoAtual }: { passoAtual: number }) {
  return (
    <nav aria-label="Progresso" className="mx-auto w-full max-w-xl">
      <ol className="flex items-start">
        {PASSOS.map((passo, i) => {
          const concluido = i < passoAtual
          const atual = i === passoAtual
          return (
            <li key={passo} className="flex flex-1 flex-col items-center gap-1.5 relative">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-4 right-1/2 h-1 w-full -translate-y-1/2 rounded-full",
                    i <= passoAtual ? "bg-primary" : "bg-border",
                  )}
                />
              )}
              <span
                aria-current={atual ? "step" : undefined}
                className={cn(
                  "relative z-10 flex size-8 items-center justify-center rounded-full border-2 font-heading text-sm font-semibold transition-colors",
                  concluido && "border-primary bg-primary text-primary-foreground",
                  atual && "border-primary bg-card text-primary ring-4 ring-primary/20",
                  !concluido && !atual && "border-border bg-card text-muted-foreground",
                )}
              >
                {concluido ? <Check className="size-4" aria-hidden="true" /> : i + 1}
              </span>
              <span
                className={cn(
                  "text-xs font-semibold md:text-sm",
                  atual ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {passo}
                {concluido && <span className="sr-only"> (concluído)</span>}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
