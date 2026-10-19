import Link from "next/link"
import { Star } from "lucide-react"

export function Cabecalho() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center px-4 md:h-20 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-2xl font-heading text-xl font-bold text-foreground outline-none focus-visible:ring-4 focus-visible:ring-ring/40 md:text-2xl"
        >
          <span className="flex size-9 items-center justify-center rounded-2xl bg-accent sombra-gordinha [--cor-sombra:var(--accent)] md:size-10">
            <Star className="size-5 fill-card text-card md:size-6" aria-hidden="true" />
          </span>
          <span>
            Mapa da <span className="text-primary">Linguagem</span>
          </span>
        </Link>
      </div>
    </header>
  )
}
