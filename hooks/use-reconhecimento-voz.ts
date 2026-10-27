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

export type ErroVoz = "sem-fala" | "sem-permissao" | "indisponivel"

type Opcoes = {
  /** Chamado uma vez, com o texto final reconhecido. */
  onTexto: (texto: string) => void
  /** Chamado quando não saiu texto utilizável. */
  onErro: (erro: ErroVoz) => void
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
  const reconhecedor = useRef<Reconhecedor | null>(null)
  const limite = useRef<ReturnType<typeof setTimeout> | null>(null)
  const entregue = useRef(false)
  const textoFinal = useRef("")
  const erroAtual = useRef<ErroVoz | null>(null)
  const callbacks = useRef({ onTexto, onErro })

  useEffect(() => {
    callbacks.current = { onTexto, onErro }
  })

  useEffect(() => {
    setSuportado(obterConstrutor() !== null)
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
      callbacks.current.onErro("indisponivel")
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
      if (e.error === "no-speech" || e.error === "aborted") erroAtual.current = "sem-fala"
      else if (e.error === "not-allowed" || e.error === "service-not-allowed") erroAtual.current = "sem-permissao"
      else erroAtual.current = "indisponivel"
    }

    r.onend = () => {
      limpar()
      reconhecedor.current = null
      if (entregue.current) return
      entregue.current = true
      if (textoFinal.current) callbacks.current.onTexto(textoFinal.current)
      else callbacks.current.onErro(erroAtual.current ?? "sem-fala")
    }

    reconhecedor.current = r
    try {
      r.start()
    } catch {
      reconhecedor.current = null
      callbacks.current.onErro("indisponivel")
      return
    }
    limite.current = setTimeout(() => reconhecedor.current?.stop(), limiteMs)
  }, [limiteMs, limpar, parar])

  useEffect(() => parar, [parar])

  return { suportado, iniciar, parar }
}
