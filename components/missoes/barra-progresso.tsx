import { Star } from "lucide-react"

export function BarraProgresso({ atual, total }: { atual: number; total: number }) {
  const terminou = atual >= total
  const missaoAtual = Math.min(atual + 1, total)
  const rotulo = terminou ? "Todas as missões concluídas!" : `Missão ${missaoAtual} de ${total}`
  const porcentagem = terminou ? 100 : (missaoAtual / total) * 100

  return (
    <div className="sticky top-20 z-20 flex items-center gap-3 rounded-3xl border-2 border-border bg-card px-4 py-3 sombra-suave md:top-24">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-accent sombra-gordinha [--cor-sombra:var(--accent)]">
        <Star className="size-5 fill-card text-card" aria-hidden="true" />
      </span>
      <div className="flex flex-1 flex-col gap-1.5">
        <span className="font-heading text-lg font-bold leading-none">{rotulo}</span>
        <div
          role="progressbar"
          aria-label="Progresso das missões"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={terminou ? total : missaoAtual}
          aria-valuetext={rotulo}
          className="h-3.5 w-full overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
            style={{ width: `${porcentagem}%` }}
          />
        </div>
      </div>
      <span className="font-heading text-sm font-semibold text-muted-foreground">
        {atual}/{total}
      </span>
    </div>
  )
}
