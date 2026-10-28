"use client"

import { useSyncExternalStore } from "react"
import { reiniciarProgresso } from "@/lib/progresso"

/*
 * Dados da criança só para a demonstração: ficam na sessão do navegador (sessionStorage)
 * e nunca saem do aparelho. Se ninguém passou pelo cadastro, os relatórios usam o exemplo "Lia, 5 anos".
 */
export type Crianca = { apelido: string; idade: number }

const CHAVE = "mapa-da-linguagem:crianca"
export const CRIANCA_EXEMPLO: Crianca = { apelido: "Lia", idade: 5 }

export function salvarCrianca(crianca: Crianca) {
  /* Outra criança começa com o mapa do zero. */
  reiniciarProgresso()
  try {
    sessionStorage.setItem(CHAVE, JSON.stringify(crianca))
  } catch {
    /* sem armazenamento disponível: os relatórios usam o exemplo */
  }
}

const assinar = () => () => {}

function lerBruto() {
  try {
    return sessionStorage.getItem(CHAVE) ?? ""
  } catch {
    return ""
  }
}

function interpretar(bruto: string): Crianca {
  if (!bruto) return CRIANCA_EXEMPLO
  try {
    const dados = JSON.parse(bruto) as Partial<Crianca>
    const apelido = typeof dados.apelido === "string" ? dados.apelido.trim() : ""
    const idade = typeof dados.idade === "number" ? dados.idade : NaN
    return apelido && Number.isFinite(idade) ? { apelido, idade } : CRIANCA_EXEMPLO
  } catch {
    return CRIANCA_EXEMPLO
  }
}

/* No servidor devolve o exemplo; no navegador, o que foi digitado no cadastro. */
export function useCrianca(): Crianca {
  const bruto = useSyncExternalStore(assinar, lerBruto, () => "")
  return interpretar(bruto)
}

/* Data de hoje no formato brasileiro (vazia no servidor, para não divergir na hidratação). */
export function useDataHoje(): string {
  return useSyncExternalStore(
    assinar,
    () => new Date().toLocaleDateString("pt-BR"),
    () => "",
  )
}
