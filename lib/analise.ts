"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { ROTEIROS, type PersonagemJogavel } from "@/lib/roteiro-sessao"
import {
  normalizarSaida,
  type AnaliseIA,
  type EntradaAnalise,
  type TrocaEnviada,
} from "@/lib/analise-tipos"
import type { Transcricao } from "@/lib/transcricao"

/*
 * Resultado da análise por IA, guardado só na sessão do navegador (sessionStorage), como o resto.
 * A análise só é pedida quando alguém toca em "Analisar com IA"; nada é enviado antes disso.
 * Qualquer resposta nova, cadastro novo ou ?concluidas=0 apaga a análise, para ela nunca ficar desatualizada.
 */
const CHAVE = "mapa-da-linguagem:analise"
const TEMPO_LIMITE_MS = 40_000

const ouvintes = new Set<() => void>()
const avisar = () => ouvintes.forEach((f) => f())
const assinar = (f: () => void) => {
  ouvintes.add(f)
  return () => {
    ouvintes.delete(f)
  }
}

function lerBruto() {
  try {
    return sessionStorage.getItem(CHAVE) ?? ""
  } catch {
    return ""
  }
}

function interpretar(bruto: string): AnaliseIA | null {
  if (!bruto) return null
  try {
    const dados = JSON.parse(bruto) as Partial<AnaliseIA>
    const saida = normalizarSaida(dados)
    if (!saida || typeof dados.geradaEm !== "string" || typeof dados.idade !== "number") return null
    const origem = dados.origem === "real" || dados.origem === "simulado" || dados.origem === "misto" ? dados.origem : "misto"
    const missoes = Array.isArray(dados.missoes) ? dados.missoes.filter((m): m is string => typeof m === "string") : []
    const provedor = typeof dados.provedor === "string" ? dados.provedor.slice(0, 40) : undefined
    return { ...saida, geradaEm: dados.geradaEm, idade: dados.idade, origem, missoes, provedor }
  } catch {
    return null
  }
}

export function reiniciarAnalise() {
  try {
    sessionStorage.removeItem(CHAVE)
  } catch {
    /* sem armazenamento disponível */
  }
  avisar()
}

/* No servidor devolve nada; no navegador, a análise guardada nesta aba. */
export function useAnalise(): AnaliseIA | null {
  const bruto = useSyncExternalStore(assinar, lerBruto, () => "")
  return interpretar(bruto)
}

export type Disponibilidade = "carregando" | "sim" | "nao"

/* Pergunta ao servidor se a análise por IA está ligada (existe a chave). Sem ela, o botão nem aparece. */
export function useAnaliseDisponivel(): { estado: Disponibilidade; provedor: string } {
  const [estado, setEstado] = useState<Disponibilidade>("carregando")
  const [provedor, setProvedor] = useState("")
  useEffect(() => {
    let ativo = true
    fetch("/api/analise", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { disponivel?: boolean; provedor?: string } | null) => {
        if (!ativo) return
        setProvedor(typeof d?.provedor === "string" ? d.provedor.slice(0, 40) : "")
        setEstado(d?.disponivel ? "sim" : "nao")
      })
      .catch(() => ativo && setEstado("nao"))
    return () => {
      ativo = false
    }
  }, [])
  return { estado, provedor }
}

/* Monta o que vai ao servidor: só idade e texto das respostas, com a fala da personagem. Sem apelido. */
export function montarEntrada(idade: number, transcricao: Transcricao) {
  const trocas: TrocaEnviada[] = []
  const missoes: string[] = []
  const origens = new Set<"real" | "simulado">()
  for (const missao of Object.keys(ROTEIROS) as PersonagemJogavel[]) {
    const respostas = transcricao[missao]
    if (!respostas || respostas.length === 0) continue
    const roteiro = ROTEIROS[missao]
    missoes.push(roteiro.rotulo)
    respostas.forEach((r, i) => {
      origens.add(r.origem)
      trocas.push({ missao: `${roteiro.rotulo} · ${roteiro.tema}`, pergunta: roteiro.trocas[i]?.tata ?? "", resposta: r.texto })
    })
  }
  if (trocas.length === 0) return null
  const entrada: EntradaAnalise = { idade, trocas }
  const origem: AnaliseIA["origem"] = origens.size > 1 ? "misto" : origens.has("real") ? "real" : "simulado"
  return { entrada, missoes, origem }
}

export type CodigoFalha = "desligada" | "limite" | "tempo" | "falha"

export class FalhaAnalise extends Error {
  codigo: CodigoFalha
  constructor(codigo: CodigoFalha) {
    super(codigo)
    this.codigo = codigo
  }
}

export async function solicitarAnalise(idade: number, transcricao: Transcricao): Promise<AnaliseIA> {
  const montada = montarEntrada(idade, transcricao)
  if (!montada) throw new FalhaAnalise("falha")

  let resposta: Response
  try {
    resposta = await fetch("/api/analise", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(montada.entrada),
      signal: AbortSignal.timeout(TEMPO_LIMITE_MS),
      cache: "no-store",
    })
  } catch (erro) {
    throw new FalhaAnalise(erro instanceof Error && (erro.name === "TimeoutError" || erro.name === "AbortError") ? "tempo" : "falha")
  }
  if (resposta.status === 503) throw new FalhaAnalise("desligada")
  if (resposta.status === 429) throw new FalhaAnalise("limite")
  if (!resposta.ok) throw new FalhaAnalise("falha")

  const corpo = await resposta.json().catch(() => null)
  const saida = normalizarSaida(corpo)
  if (!saida) throw new FalhaAnalise("falha")
  const provedor = typeof corpo?.provedor === "string" ? corpo.provedor.slice(0, 40) : undefined

  const analise: AnaliseIA = {
    ...saida,
    geradaEm: new Date().toISOString(),
    idade,
    origem: montada.origem,
    missoes: montada.missoes,
    provedor,
  }
  try {
    sessionStorage.setItem(CHAVE, JSON.stringify(analise))
  } catch {
    /* sem armazenamento: a análise some ao recarregar */
  }
  avisar()
  return analise
}
