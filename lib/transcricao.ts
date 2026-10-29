"use client"

import { useSyncExternalStore } from "react"
import { ROTEIROS, type PersonagemJogavel } from "@/lib/roteiro-sessao"

/*
 * Respostas da criança nas missões, só como TEXTO, para o relatório profissional mostrar a conversa real.
 * Ficam na sessão do navegador (sessionStorage): somem ao fechar a aba e nunca saem do aparelho.
 * Nenhum áudio é guardado. Um cadastro novo (outra criança) apaga tudo.
 */
const CHAVE = "mapa-da-linguagem:transcricao"
const LIMITE_TEXTO = 400

/** "simulado" = resposta do roteiro (botão de demonstração); "real" = texto transcrito pela voz do navegador. */
export type OrigemResposta = "simulado" | "real"
export type RespostaGravada = { texto: string; origem: OrigemResposta }
export type Transcricao = Partial<Record<PersonagemJogavel, RespostaGravada[]>>

function lerBruto() {
  try {
    return sessionStorage.getItem(CHAVE) ?? ""
  } catch {
    return ""
  }
}

function interpretar(bruto: string): Transcricao {
  if (!bruto) return {}
  try {
    const dados = JSON.parse(bruto) as Record<string, unknown>
    const resultado: Transcricao = {}
    for (const missao of Object.keys(ROTEIROS) as PersonagemJogavel[]) {
      const lista = dados[missao]
      if (!Array.isArray(lista)) continue
      const validas = lista.filter(
        (r): r is RespostaGravada =>
          typeof r === "object" &&
          r !== null &&
          typeof (r as RespostaGravada).texto === "string" &&
          ((r as RespostaGravada).origem === "simulado" || (r as RespostaGravada).origem === "real"),
      )
      if (validas.length > 0) resultado[missao] = validas.slice(0, ROTEIROS[missao].trocas.length)
    }
    return resultado
  } catch {
    return {}
  }
}

/*
 * Guarda a resposta da troca `indice` (0 a 4) da missão. Jogar a missão de novo (troca 0)
 * começa essa missão do zero, e voltar numa troca descarta o que viria depois dela.
 */
export function gravarResposta(missao: PersonagemJogavel, indice: number, texto: string, origem: OrigemResposta) {
  const limpo = texto.trim().slice(0, LIMITE_TEXTO)
  if (!limpo) return
  try {
    const atual = interpretar(lerBruto())
    const anteriores = (atual[missao] ?? []).slice(0, Math.max(indice, 0))
    atual[missao] = [...anteriores, { texto: limpo, origem }]
    sessionStorage.setItem(CHAVE, JSON.stringify(atual))
  } catch {
    /* sem armazenamento disponível: o relatório mostra a conversa de exemplo */
  }
}

export function reiniciarTranscricao() {
  try {
    sessionStorage.removeItem(CHAVE)
  } catch {
    /* sem armazenamento disponível */
  }
}

/* Missões com ao menos uma resposta guardada, na ordem do mapa. */
export function missoesJogadas(transcricao: Transcricao): PersonagemJogavel[] {
  return (Object.keys(ROTEIROS) as PersonagemJogavel[]).filter((m) => (transcricao[m]?.length ?? 0) > 0)
}

const assinar = () => () => {}

/* No servidor devolve vazio; no navegador, o que foi dito nas missões jogadas nesta aba. */
export function useTranscricao(): Transcricao {
  const bruto = useSyncExternalStore(assinar, lerBruto, () => "")
  return interpretar(bruto)
}
