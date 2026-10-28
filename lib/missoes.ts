import type { NomePersonagem } from "@/components/personagem"

export type Missao = {
  personagem: NomePersonagem
  tema: string
  /* Posição da parada no mapa, em % da largura (x) e da altura (y). */
  x: number
  y: number
}

/* Tata e Sisi são jogáveis (conversa em /sessao?missao=...); as demais paradas ainda são "Em breve". */
export const MISSOES: Missao[] = [
  { personagem: "tata", tema: "Histórias", x: 24, y: 13 },
  { personagem: "sisi", tema: "Perguntas", x: 74, y: 31 },
  { personagem: "nana", tema: "Palavras novas", x: 27, y: 50 },
  { personagem: "belinha", tema: "Desafios", x: 73, y: 70 },
  { personagem: "mari", tema: "Comemoração", x: 46, y: 90 },
]

export type StatusMissao = "concluida" | "liberada" | "bloqueada"

export function statusDaMissao(indice: number, concluidas: number): StatusMissao {
  if (indice < concluidas) return "concluida"
  if (indice === concluidas) return "liberada"
  return "bloqueada"
}
