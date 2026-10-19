"use client"

import Image from "next/image"
import { motion, type Variants } from "framer-motion"

export type NomePersonagem = "sisi" | "tata" | "nana" | "belinha" | "mari"
export type EstadoPersonagem = "parado" | "falando" | "comemorando" | "entrando"

const PROPORCAO = 0.43

const NOMES_EXIBICAO: Record<NomePersonagem, string> = {
  sisi: "Sisi",
  tata: "Tata",
  nana: "Naná",
  belinha: "Belinha",
  mari: "Mari",
}

const animacoes: Variants = {
  parado: {
    scaleX: [1, 1.012, 1],
    scaleY: [1, 1.022, 1],
    rotate: [-0.8, 0.8, -0.8],
    transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
  },
  falando: {
    y: [0, -6, 0],
    rotate: [-1.5, 1.5, -1.5],
    transition: { duration: 0.42, repeat: Infinity, ease: "easeInOut" },
  },
  comemorando: {
    y: [0, -46, -46, 0],
    rotate: [0, -5, 5, 0],
    scaleY: [0.92, 1.05, 1.05, 0.92],
    scaleX: [1.06, 0.97, 0.97, 1.06],
    transition: { duration: 0.75, repeat: Infinity, ease: "easeOut" },
  },
  entrando: {
    y: [120, -14, 0],
    scale: [0.6, 1.04, 1],
    opacity: [0, 1, 1],
    transition: { duration: 0.9, ease: "easeOut" },
  },
}

type PersonagemProps = {
  nome: NomePersonagem
  estado?: EstadoPersonagem
  altura?: number
}

export function Personagem({ nome, estado = "parado", altura = 280 }: PersonagemProps) {
  /* As personagens são o centro da demonstração e o movimento delas é suave: não seguem "reduzir movimento" do sistema. */
  const reduzirMovimento = false
  const largura = Math.round(altura * PROPORCAO)

  return (
    <div className="relative" style={{ height: altura, width: largura }}>
      <motion.div
        key={reduzirMovimento ? "estatico" : estado}
        className="relative h-full w-full"
        style={{ transformOrigin: "50% 100%" }}
        variants={animacoes}
        animate={reduzirMovimento ? undefined : estado}
      >
        <Image
          src={`/personagens/${nome}.png`}
          alt={NOMES_EXIBICAO[nome]}
          fill
          sizes={`${largura}px`}
          className="object-contain object-bottom"
          priority
        />
      </motion.div>
    </div>
  )
}
