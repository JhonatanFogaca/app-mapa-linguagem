"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { PERSONAGENS } from "@/lib/personagens"

const CORES = PERSONAGENS.map((p) => p.hex)

function criarPecas() {
  return Array.from({ length: 70 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    cor: CORES[i % CORES.length],
    tamanho: 8 + Math.random() * 8,
    redonda: Math.random() > 0.6,
    atraso: Math.random() * 0.8,
    duracao: 2.4 + Math.random() * 1.8,
    desvio: (Math.random() - 0.5) * 160,
    giro: (Math.random() - 0.5) * 720,
  }))
}

export function Confete() {
  const reduzirMovimento = useReducedMotion()
  const [pecas] = useState(criarPecas)

  if (reduzirMovimento) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {pecas.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 block"
          style={{
            left: `${p.left}%`,
            width: p.tamanho,
            height: p.redonda ? p.tamanho : p.tamanho * 0.5,
            backgroundColor: p.cor,
            borderRadius: p.redonda ? "9999px" : "2px",
          }}
          initial={{ y: "-5vh", x: 0, rotate: 0, opacity: 1 }}
          animate={{ y: "105vh", x: p.desvio, rotate: p.giro, opacity: [1, 1, 0.8] }}
          transition={{ duration: p.duracao, delay: p.atraso, ease: "easeIn", repeat: 1 }}
        />
      ))}
    </div>
  )
}
