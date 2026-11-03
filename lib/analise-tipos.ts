/*
 * Tipos e validações da análise por IA, usados no servidor (app/api/analise) e no navegador.
 * Sem "use client": este arquivo não depende de nada do navegador.
 *
 * Regras do projeto: nunca entra apelido nem áudio; só a idade e o texto das respostas.
 * O resultado é em CATEGORIAS (as fonoaudiólogas preferem assim) e não tem nota de 0 a 100,
 * porque os critérios numéricos por idade ainda não foram definidos por elas.
 */

export const IDS_DOMINIO = ["sintaxe", "vocabulario", "narrativa", "processamento"] as const
export type IdDominio = (typeof IDS_DOMINIO)[number]

export const SITUACOES = ["dentro", "atencao", "acima", "poucos-dados"] as const
export type SituacaoIA = (typeof SITUACOES)[number]

export const ROTULO_SITUACAO: Record<SituacaoIA, string> = {
  dentro: "Dentro do esperado",
  atencao: "Sinal de atenção",
  acima: "Acima do esperado",
  "poucos-dados": "Poucos dados",
}

export const LIMITES = {
  trocas: 15,
  missao: 40,
  pergunta: 300,
  resposta: 400,
  sintese: 320,
  tecnico: 320,
  simples: 240,
  dica: 200,
} as const

export type TrocaEnviada = { missao: string; pergunta: string; resposta: string }
export type EntradaAnalise = { idade: number; trocas: TrocaEnviada[] }

export type DominioIA = {
  id: IdDominio
  situacao: SituacaoIA
  tecnico: string
  simples: string
  dica: string
}

/* O que o servidor devolve. */
export type SaidaAnalise = { sintese: string; dominios: DominioIA[] }

/* O que o navegador guarda na sessão (a saída mais o contexto da análise). */
export type AnaliseIA = SaidaAnalise & {
  geradaEm: string
  idade: number
  /* De onde vieram as respostas analisadas: voz real, respostas simuladas ou as duas. */
  origem: "real" | "simulado" | "misto"
  /* Rótulos das missões analisadas (ex.: "Tata", "Sisi"). */
  missoes: string[]
  /* Serviço de IA que gerou a análise (ex.: "Anthropic", "Google (Gemini)"). */
  provedor?: string
}

function texto(valor: unknown, limite: number): string {
  return typeof valor === "string" ? valor.replace(/\s+/g, " ").trim().slice(0, limite) : ""
}

/* Confere e limpa o que chega do navegador. Devolve null se não der para usar. */
export function validarEntrada(bruto: unknown): EntradaAnalise | null {
  if (typeof bruto !== "object" || bruto === null) return null
  const { idade, trocas } = bruto as { idade?: unknown; trocas?: unknown }
  if (typeof idade !== "number" || !Number.isInteger(idade) || idade < 3 || idade > 10) return null
  if (!Array.isArray(trocas) || trocas.length === 0 || trocas.length > LIMITES.trocas) return null

  const limpas: TrocaEnviada[] = []
  for (const t of trocas) {
    if (typeof t !== "object" || t === null) return null
    const { missao, pergunta, resposta } = t as Record<string, unknown>
    const r = texto(resposta, LIMITES.resposta)
    if (!r) continue
    limpas.push({
      missao: texto(missao, LIMITES.missao) || "Missão",
      pergunta: texto(pergunta, LIMITES.pergunta),
      resposta: r,
    })
  }
  return limpas.length > 0 ? { idade, trocas: limpas } : null
}

/* Confere e limpa o que a IA devolveu. Exige os quatro domínios, cada um uma vez. */
export function normalizarSaida(bruto: unknown): SaidaAnalise | null {
  if (typeof bruto !== "object" || bruto === null) return null
  const { sintese, dominios } = bruto as { sintese?: unknown; dominios?: unknown }
  const resumo = texto(sintese, LIMITES.sintese)
  if (!resumo || !Array.isArray(dominios)) return null

  const resultado: DominioIA[] = []
  for (const id of IDS_DOMINIO) {
    const item = dominios.find((d) => typeof d === "object" && d !== null && (d as { id?: unknown }).id === id) as
      | Record<string, unknown>
      | undefined
    if (!item) return null
    const situacao = SITUACOES.find((s) => s === item.situacao)
    const tecnico = texto(item.tecnico, LIMITES.tecnico)
    const simples = texto(item.simples, LIMITES.simples)
    const dica = texto(item.dica, LIMITES.dica)
    if (!situacao || !tecnico || !simples || !dica) return null
    resultado.push({ id, situacao, tecnico, simples, dica })
  }
  return { sintese: resumo, dominios: resultado }
}
