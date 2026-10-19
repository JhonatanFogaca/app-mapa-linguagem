import type { Metadata } from "next"
import { CardPersonagem } from "@/components/card-personagem"
import type { NomePersonagem } from "@/components/personagem"

export const metadata: Metadata = {
  title: "Teste dos personagens",
  description: "Pré-visualização dos personagens e de seus estados de animação.",
}

const PERSONAGENS: NomePersonagem[] = ["sisi", "tata", "nana", "belinha", "mari"]

export default function TestePage() {
  return (
    <main className="min-h-svh bg-muted/40 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-balance text-3xl font-semibold tracking-tight">Teste dos personagens</h1>
          <p className="mt-2 text-pretty text-muted-foreground">
            Troque o estado de cada personagem para conferir as animações.
          </p>
        </header>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PERSONAGENS.map((nome) => (
            <li key={nome}>
              <CardPersonagem nome={nome} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
