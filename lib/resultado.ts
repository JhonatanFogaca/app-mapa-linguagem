/* Resultado de exemplo da demonstração: dados fictícios, nada é medido de verdade. */
export type Dominio = {
  id: string
  nome: string
  personagem: "sisi" | "tata" | "nana" | "belinha" | "mari"
  /* Pontuação da criança e faixa esperada para a idade, de 0 a 100. */
  pontos: number
  faixaMin: number
  faixaMax: number
  /* Texto técnico (relatório profissional). */
  tecnico: string
  /* Texto simples (relatório dos pais). */
  simples: string
  dica: string
}

export const DOMINIOS: Dominio[] = [
  {
    id: "sintaxe",
    nome: "Sintaxe e gramática",
    personagem: "tata",
    pontos: 72,
    faixaMin: 60,
    faixaMax: 85,
    tecnico:
      "Enunciados de 4 a 6 palavras, com sujeito e verbo na maioria. Concordância verbal adequada; omissão ocasional de artigos e preposições.",
    simples: "Monta frases completas e usa bem os verbos. Às vezes esquece palavrinhas como “o”, “a” e “de”.",
    dica: "Repita as frases dela com a palavrinha que faltou, sem corrigir: “Quero o carrinho!”.",
  },
  {
    id: "vocabulario",
    nome: "Vocabulário",
    personagem: "nana",
    pontos: 58,
    faixaMin: 60,
    faixaMax: 85,
    tecnico:
      "Variedade lexical levemente abaixo do esperado. Boa nomeação de objetos e ações; poucos termos de categoria, de atributo e de relação.",
    simples: "Conhece muitas palavras do dia a dia. Está começando a aprender palavras que descrevem cor, tamanho e lugar.",
    dica: "Ao brincar, comente o que vocês veem: “O carro é grande e vermelho”.",
  },
  {
    id: "narrativa",
    nome: "Coerência narrativa",
    personagem: "sisi",
    pontos: 66,
    faixaMin: 55,
    faixaMax: 80,
    tecnico:
      "Narrativa com início e fim reconhecíveis. Sequência dos fatos parcialmente organizada; uso inicial de conectivos (“e”, “aí”).",
    simples: "Conta pequenas histórias com começo e fim. Ainda está aprendendo a ligar os acontecimentos na ordem certa.",
    dica: "Depois de ler um livro, peça: “O que aconteceu primeiro? E depois?”.",
  },
  {
    id: "processamento",
    nome: "Processamento e resposta",
    personagem: "belinha",
    pontos: 80,
    faixaMin: 60,
    faixaMax: 85,
    tecnico:
      "Compreensão adequada de perguntas simples e de ordens com dois passos. Latência de resposta dentro do esperado, com pausas curtas.",
    simples: "Entende bem o que a gente fala e responde no tempo dela. Um ponto forte!",
    dica: "Continue conversando com calma e dando tempo para ela responder.",
  },
]

export function situacao(d: Dominio): "dentro" | "atencao" | "acima" {
  if (d.pontos < d.faixaMin) return "atencao"
  if (d.pontos > d.faixaMax) return "acima"
  return "dentro"
}

export const AVISO_TRIAGEM =
  "Este resultado é uma triagem de demonstração, não um diagnóstico. Somente um(a) fonoaudiólogo(a) pode avaliar a criança."
