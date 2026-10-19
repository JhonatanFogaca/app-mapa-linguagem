"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Personagem, type EstadoPersonagem, type NomePersonagem } from "@/components/personagem"
import { PersonagemAnimado } from "@/components/personagem-animado"
import { INFO_PERSONAGEM, usaPersonagemAnimado } from "@/lib/personagens"
import { cn } from "@/lib/utils"

const ESTADOS: { valor: EstadoPersonagem; rotulo: string }[] = [
  { valor: "parado", rotulo: "Parado" },
  { valor: "falando", rotulo: "Falando" },
  { valor: "comemorando", rotulo: "Comemorando" },
  { valor: "entrando", rotulo: "Entrando" },
]

export function CardPersonagem({ nome }: { nome: NomePersonagem }) {
  const [estado, setEstado] = useState<EstadoPersonagem>("entrando")
  const [repeticao, setRepeticao] = useState(0)
  const info = INFO_PERSONAGEM[nome]

  const trocarEstado = (novo: EstadoPersonagem) => {
    setEstado(novo)
    if (novo === "entrando") setRepeticao((r) => r + 1)
  }

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl border-2 bg-card text-card-foreground sombra-suave",
        info.borda,
      )}
    >
      <div className={cn("flex h-80 items-end justify-center overflow-hidden pt-6", info.fundoSuave)}>
        {usaPersonagemAnimado(nome) ? (
          <PersonagemAnimado key={repeticao} nome={nome as "tata" | "mari"} estado={estado} altura={280} />
        ) : (
          <Personagem key={repeticao} nome={nome} estado={estado} altura={280} />
        )}
      </div>
      <div className="flex flex-col gap-3 p-4">
        <h2>
          <span className={cn("inline-flex rounded-full px-3 py-1 font-heading text-lg font-bold", info.etiqueta)}>
            {info.rotulo}
          </span>
        </h2>
        <div className="flex flex-wrap gap-2" role="group" aria-label={`Estado de ${info.rotulo}`}>
          {ESTADOS.map(({ valor, rotulo }) => (
            <Button
              key={valor}
              size="sm"
              variant={estado === valor ? "default" : "outline"}
              aria-pressed={estado === valor}
              onClick={() => trocarEstado(valor)}
            >
              {rotulo}
            </Button>
          ))}
        </div>
      </div>
    </article>
  )
}
