"use client"

// Personagem com animação por partes: cabelo (12 quadros), piscar e boca.
// Funciona para "tata" e "mari" (as outras 3 ainda usam só <Personagem>, de corpo inteiro).
// Arquivos esperados em /public/animados/{nome}/ e /public/animados/config.json (veja o pacote).

import { useEffect, useRef, useState } from "react"
import { motion, type Variants } from "framer-motion"
import config from "@/public/animados/config.json"

export type EstadoAnimado = "parado" | "falando" | "comemorando" | "entrando"
type Nome = "tata" | "mari"

const CICLO_FALA: Record<Nome, (string | null)[]> = {
  tata: ["boca-aberta", null, "boca-meia", "boca-fechada", "boca-aberta", "boca-meia", null],
  mari: ["boca-pequena", "boca-aberta", "boca-pequena", null, "boca-aberta", "boca-pequena"],
}
const rnd = (a: number, b: number) => a + Math.random() * (b - a)
const pad = (n: number) => String(n).padStart(2, "0")

const corpo: Variants = {
  parado: { scaleY: [1, 1.022, 1], rotate: [-0.8, 0.8, -0.8], transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut" } },
  falando: { y: [0, -6, 0], rotate: [-1.5, 1.5, -1.5], transition: { duration: 0.42, repeat: Infinity, ease: "easeInOut" } },
  comemorando: { y: [0, -46, -46, 0], rotate: [0, -5, 5, 0], scaleY: [0.92, 1.05, 1.05, 0.92], transition: { duration: 0.75, repeat: Infinity, ease: "easeOut" } },
  entrando: { y: [120, -14, 0], scale: [0.6, 1.04, 1], opacity: [0, 1, 1], transition: { duration: 0.9, ease: "easeOut" } },
}

type Camada = { left: number; top: number; width: number; height: number }
type ConfigPersonagem = { quadros: number; proporcao: number; camadas: Record<string, Camada> }

export function PersonagemAnimado({ nome, estado = "parado", altura = 280 }: { nome: Nome; estado?: EstadoAnimado; altura?: number }) {
  const c = (config as unknown as Record<Nome, ConfigPersonagem>)[nome]
  /* As personagens são o centro da demonstração e o movimento delas é suave: não seguem "reduzir movimento" do sistema. */
  const reduzirMovimento = false
  const [quadro, setQuadro] = useState(0)
  const [piscando, setPiscando] = useState(false)
  const [boca, setBoca] = useState<string | null>(null)
  const estadoRef = useRef(estado)

  useEffect(() => {
    estadoRef.current = estado
  }, [estado])

  // cabelo: troca de quadro
  useEffect(() => {
    if (reduzirMovimento) return
    const t = setInterval(() => setQuadro((q) => (q + 1) % c.quadros), 150)
    return () => clearInterval(t)
  }, [c.quadros, reduzirMovimento])

  // piscar em intervalos aleatórios
  useEffect(() => {
    if (reduzirMovimento) return
    let t: ReturnType<typeof setTimeout>
    const piscar = () => {
      t = setTimeout(() => {
        setPiscando(true)
        t = setTimeout(() => { setPiscando(false); piscar() }, 130)
      }, rnd(2200, 4800))
    }
    piscar()
    return () => clearTimeout(t)
  }, [reduzirMovimento])

  // boca acompanha o estado
  useEffect(() => {
    if (reduzirMovimento) {
      setBoca(null)
      return
    }
    let i = 0
    let t: ReturnType<typeof setTimeout>
    const passo = () => {
      const e = estadoRef.current
      if (e === "falando") setBoca(CICLO_FALA[nome][i++ % CICLO_FALA[nome].length])
      else if (e === "comemorando") setBoca("boca-aberta")
      else setBoca(null)
      t = setTimeout(passo, e === "falando" ? rnd(110, 190) : 200)
    }
    passo()
    return () => clearTimeout(t)
  }, [nome, reduzirMovimento])

  const camadas = c.camadas
  const pos = (k: string) => ({ left: `${camadas[k].left}%`, top: `${camadas[k].top}%`, width: `${camadas[k].width}%`, height: `${camadas[k].height}%` })
  const nomeExibicao = nome === "tata" ? "Tata" : "Mari"

  return (
    <div style={{ height: altura, width: altura * c.proporcao, position: "relative" }}>
      <motion.div
        key={reduzirMovimento ? "estatico" : estado}
        animate={reduzirMovimento ? undefined : estado}
        variants={corpo}
        style={{ transformOrigin: "50% 100%", height: "100%", width: "100%", position: "relative" }}
      >
        {/* eslint-disable @next/next/no-img-element */}
        <img src={`/animados/${nome}/balanco-${pad(quadro)}.png`} alt={nomeExibicao} style={{ width: "100%", height: "100%", display: "block" }} />
        <img src={`/animados/${nome}/olhos.png`} alt="" aria-hidden="true" style={{ position: "absolute", ...pos("olhos"), opacity: piscando ? 1 : 0 }} />
        {Object.keys(camadas).filter((k) => k.startsWith("boca")).map((k) => (
          <img key={k} src={`/animados/${nome}/${k}.png`} alt="" aria-hidden="true" style={{ position: "absolute", ...pos(k), opacity: boca === k ? 1 : 0 }} />
        ))}
        {/* eslint-enable @next/next/no-img-element */}
      </motion.div>
    </div>
  )
}
