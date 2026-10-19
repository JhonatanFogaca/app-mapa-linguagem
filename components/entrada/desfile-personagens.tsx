"use client"

import { useEffect, useState } from "react"
import { Personagem, type EstadoPersonagem, type NomePersonagem } from "@/components/personagem"
import { PersonagemAnimado } from "@/components/personagem-animado"
import { useMediaQuery } from "@/hooks/use-media-query"

const ORDEM: NomePersonagem[] = ["sisi", "tata", "nana", "belinha", "mari"]
const ATRASO_MS = 150
const DURACAO_ENTRADA_MS = 900

type EstadoFila = EstadoPersonagem | "aguardando"

function PersonagemNaFila({
  nome,
  indice,
  animarEntrada,
  altura,
}: {
  nome: NomePersonagem
  indice: number
  animarEntrada: boolean
  altura: number
}) {
  const [estado, setEstado] = useState<EstadoFila>(animarEntrada ? "aguardando" : "parado")

  // Only the initial mount decides whether the entrance plays.
  useEffect(() => {
    if (!animarEntrada) return
    const inicio = setTimeout(() => setEstado("entrando"), indice * ATRASO_MS)
    const fim = setTimeout(() => setEstado("parado"), indice * ATRASO_MS + DURACAO_ENTRADA_MS)
    return () => {
      clearTimeout(inicio)
      clearTimeout(fim)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const estadoVisivel = estado === "aguardando" ? "parado" : estado

  return (
    <li className="-mx-2 md:mx-1" style={{ opacity: estado === "aguardando" ? 0 : 1 }}>
      {nome === "tata" || nome === "mari" ? (
        <PersonagemAnimado nome={nome} estado={estadoVisivel} altura={altura} />
      ) : (
        <Personagem nome={nome} estado={estadoVisivel} altura={altura} />
      )}
    </li>
  )
}

export function DesfilePersonagens({ animarEntrada }: { animarEntrada: boolean }) {
  const tablet = useMediaQuery("(min-width: 768px)")
  const altura = tablet ? 260 : 200

  return (
    <ul aria-label="Personagens: Sisi, Tata, Naná, Belinha e Mari" className="flex items-end justify-center">
      {ORDEM.map((nome, i) => (
        <PersonagemNaFila key={nome} nome={nome} indice={i} animarEntrada={animarEntrada} altura={altura} />
      ))}
    </ul>
  )
}
