"use client"

import { useCallback, useEffect, useRef, useState } from "react"

// Os tipos de SpeechRecognition não vêm no lib.dom do TypeScript 5.7.
type EventoResultado = {
  results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>
}
type EventoErro = { error: string }

type Reconhecedor = {
  lang: string
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  onresult: ((e: EventoResultado) => void) | null
  onerror: ((e: EventoErro) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

type ConstrutorReconhecedor = new () => Reconhecedor

function obterConstrutor(): ConstrutorReconhecedor | null {
  if (typeof window === "undefined") return null
  const w = window as unknown as {
    SpeechRecognition?: ConstrutorReconhecedor
    webkitSpeechRecognition?: ConstrutorReconhecedor
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export type ErroVoz = "sem-fala" | "sem-permissao" | "rede" | "indisponivel"

/* iPhone e iPad (inclusive o Chrome deles, que usa o motor do Safari): o reconhecimento de voz falha com "aborted"
 * depois da primeira fala. Por isso a voz real fica desligada neles. */
function ehIOS() {
  if (typeof navigator === "undefined") return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
}

type Opcoes = {
  /** Chamado uma vez, com o texto final reconhecido. */
  onTexto: (texto: string) => void
  /** Chamado quando não saiu texto utilizável. `detalhe` é o código técnico do navegador, para diagnóstico. */
  onErro: (erro: ErroVoz, detalhe?: string) => void
  /** Tempo máximo de escuta, em ms. */
  limiteMs?: number
}

/**
 * Reconhecimento de fala do navegador (pt-BR), uma frase por vez.
 * O texto fica só em memória: nada é gravado por este código.
 * Atenção: no Chrome, o navegador envia o áudio a um serviço externo para transcrever.
 */
export function useReconhecimentoVoz({ onTexto, onErro, limiteMs = 12000 }: Opcoes) {
  const [suportado, setSuportado] = useState(false)
  const [motivo, setMotivo] = useState<"ios" | "sem-suporte" | null>(null)
  const reconhecedor = useRef<Reconhecedor | null>(null)
  const limite = useRef<ReturnType<typeof setTimeout> | null>(null)
  const entregue = useRef(false)
  const textoFinal = useRef("")
  const erroAtual = useRef<{ tipo: ErroVoz; detalhe: string } | null>(null)
  const callbacks = useRef({ onTexto, onErro })

  useEffect(() => {
    callbacks.current = { onTexto, onErro }
  })

  useEffect(() => {
    const temConstrutor = obterConstrutor() !== null
    const ios = ehIOS()
    setSuportado(temConstrutor && !ios)
    setMotivo(ios ? "ios" : temConstrutor ? null : "sem-suporte")
  }, [])

  const limpar = useCallback(() => {
    if (limite.current) clearTimeout(limite.current)
    limite.current = null
  }, [])

  const parar = useCallback(() => {
    limpar()
    const atual = reconhecedor.current
    reconhecedor.current = null
    if (atual) {
      atual.onresult = null
      atual.onerror = null
      atual.onend = null
      try {
        atual.abort()
      } catch {
        // já tinha terminado
      }
    }
  }, [limpar])

  const iniciar = useCallback(() => {
    const Construtor = obterConstrutor()
    if (!Construtor) {
      callbacks.current.onErro("indisponivel", "sem-suporte")
      return
    }
    parar()
    entregue.current = false
    textoFinal.current = ""
    erroAtual.current = null

    const r = new Construtor()
    r.lang = "pt-BR"
    r.continuous = false
    r.interimResults = false
    r.maxAlternatives = 1

    r.onresult = (e) => {
      const partes: string[] = []
      for (let i = 0; i < e.results.length; i++) {
        const resultado = e.results[i]
        if (resultado.isFinal && resultado[0]) partes.push(resultado[0].transcript)
      }
      textoFinal.current = partes.join(" ").trim()
    }

    r.onerror = (e) => {
      const detalhe = e.error
      if (detalhe === "no-speech" || detalhe === "aborted") erroAtual.current = { tipo: "sem-fala", detalhe }
      else if (detalhe === "not-allowed" || detalhe === "service-not-allowed") erroAtual.current = { tipo: "sem-permissao", detalhe }
      else if (detalhe === "network") erroAtual.current = { tipo: "rede", detalhe }
      else erroAtual.current = { tipo: "indisponivel", detalhe }
    }

    r.onend = () => {
      limpar()
      reconhecedor.current = null
      if (entregue.current) return
      entregue.current = true
      if (textoFinal.current) callbacks.current.onTexto(textoFinal.current)
      else callbacks.current.onErro(erroAtual.current?.tipo ?? "sem-fala", erroAtual.current?.detalhe)
    }

    reconhecedor.current = r
    try {
      r.start()
    } catch (erro) {
      reconhecedor.current = null
      callbacks.current.onErro("indisponivel", erro instanceof Error ? erro.name : "start")
      return
    }
    limite.current = setTimeout(() => reconhecedor.current?.stop(), limiteMs)
  }, [limiteMs, limpar, parar])

  useEffect(() => parar, [parar])

  return { suportado, motivo, iniciar, parar }
}
