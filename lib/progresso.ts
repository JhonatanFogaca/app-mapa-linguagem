"use client"

import { useSyncExternalStore } from "react"
import { MISSOES } from "@/lib/missoes"

/*
 * Progresso do mapa (quantas missões foram concluídas), só para a demonstração:
 * fica na sessão do navegador (sessionStorage) e nunca sai do aparelho.
 * Um cadastro novo (outra criança) zera o progresso.
 */
const CHAVE = "mapa-da-linguagem:progresso"

function limitar(n: number) {
  return Number.isFinite(n) ? Math.min(Math.max(Math.trunc(n), 0), MISSOES.length) : 0
}

function lerProgresso(): number {
  try {
    return limitar(Number.parseInt(sessionStorage.getItem(CHAVE) ?? "0", 10))
  } catch {
    return 0
  }
}

/* Grava o valor exato (usado pelo atalho ?concluidas=N e pelo reinício). */
export function definirProgresso(n: number) {
  try {
    sessionStorage.setItem(CHAVE, String(limitar(n)))
  } catch {
    /* sem armazenamento disponível: o mapa volta ao começo */
  }
}

/* Marca a missão de número `numero` (1 a 5) como concluída, sem nunca diminuir o progresso. */
export function concluirMissao(numero: number) {
  definirProgresso(Math.max(lerProgresso(), limitar(numero)))
}

export function reiniciarProgresso() {
  definirProgresso(0)
}

const assinar = () => () => {}

/* No servidor devolve 0; no navegador, o progresso guardado. */
export function useProgresso(): number {
  return useSyncExternalStore(assinar, lerProgresso, () => 0)
}
