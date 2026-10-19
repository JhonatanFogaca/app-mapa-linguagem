import { Mic, Star, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AmostraCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <article className="flex flex-col gap-3 rounded-3xl border-2 bg-card p-5 sombra-suave">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-azul text-white">
          <Mic className="size-6" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-semibold">Card de informação</h3>
        <p className="text-pretty leading-relaxed text-muted-foreground">
          Fundo branco, borda suave e ícone colorido em destaque.
        </p>
      </article>

      <article className="flex flex-col gap-3 rounded-3xl bg-rosa p-5 text-white sombra-gordinha [--cor-sombra:var(--rosa)]">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-white/20">
          <Trophy className="size-6" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-semibold">Card de conquista</h3>
        <p className="text-pretty leading-relaxed text-white/90">Cor cheia para momentos de comemoração.</p>
      </article>

      <article className="flex flex-col gap-3 rounded-3xl border-2 border-dashed border-amarelo bg-amarelo/10 p-5">
        <div className="flex gap-1" aria-label="3 de 3 estrelas" role="img">
          {[0, 1, 2].map((i) => (
            <Star key={i} className="size-7 fill-amarelo text-amarelo" aria-hidden="true" />
          ))}
        </div>
        <h3 className="text-xl font-semibold">Card de progresso</h3>
        <Button variant="accent" className="mt-auto h-11 self-start px-4 text-base">
          Continuar
        </Button>
      </article>
    </div>
  )
}
