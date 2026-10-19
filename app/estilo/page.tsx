import type { Metadata } from "next"
import { SecaoEstilo } from "@/components/estilo/secao-estilo"
import { AmostraCores } from "@/components/estilo/amostra-cores"
import { AmostraTipografia } from "@/components/estilo/amostra-tipografia"
import { AmostraBotoes } from "@/components/estilo/amostra-botoes"
import { AmostraCards } from "@/components/estilo/amostra-cards"
import { AmostraPersonagens } from "@/components/estilo/amostra-personagens"
import { DecoracaoCeu } from "@/components/entrada/decoracao-ceu"

export const metadata: Metadata = {
  title: "Folha de estilo · Mapa da Linguagem",
  description: "Cores, tipografia, botões, cards e personagens do Mapa da Linguagem.",
}

export default function EstiloPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-8 md:gap-16 md:px-6 md:py-12">
      <div className="relative overflow-hidden rounded-3xl bg-ceu/60 px-6 py-10 text-center md:py-14">
        <DecoracaoCeu />
        <div className="relative flex flex-col items-center gap-2">
          <h1 className="text-balance text-4xl font-bold md:text-5xl">Folha de estilo</h1>
          <p className="max-w-md text-pretty text-lg text-muted-foreground">
            A identidade visual do Mapa da Linguagem em um só lugar.
          </p>
        </div>
      </div>

      <SecaoEstilo titulo="Cores" descricao="Todas definidas como variáveis do tema.">
        <AmostraCores />
      </SecaoEstilo>
      <SecaoEstilo titulo="Tipografia" descricao="Fredoka para títulos e botões, Nunito para o texto.">
        <AmostraTipografia />
      </SecaoEstilo>
      <SecaoEstilo titulo="Botões" descricao="Grandes, gordinhos e com sombra suave.">
        <AmostraBotoes />
      </SecaoEstilo>
      <SecaoEstilo titulo="Cards" descricao="Cantos bem arredondados e bordas macias.">
        <AmostraCards />
      </SecaoEstilo>
      <SecaoEstilo titulo="Personagens" descricao="Cada personagem tem a sua cor.">
        <AmostraPersonagens />
      </SecaoEstilo>
    </main>
  )
}
