import type { ReactNode } from "react"
import { Star } from "lucide-react"

export function SecaoEstilo({
  titulo,
  descricao,
  children,
}: {
  titulo: string
  descricao: string
  children: ReactNode
}) {
  const id = `secao-${titulo.toLowerCase().normalize("NFD").replace(/[^a-z]/g, "")}`
  return (
    <section aria-labelledby={id} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 id={id} className="flex items-center gap-2 text-2xl font-bold md:text-3xl">
          <Star className="size-5 fill-amarelo text-amarelo" aria-hidden="true" />
          {titulo}
        </h2>
        <p className="text-muted-foreground">{descricao}</p>
      </div>
      {children}
    </section>
  )
}
