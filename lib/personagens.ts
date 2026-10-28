import type { NomePersonagem } from "@/components/personagem"
import type { PersonagemJogavel } from "@/lib/roteiro-sessao"

type InfoPersonagem = {
  nome: NomePersonagem
  rotulo: string
  corNome: string
  hex: string
  fundo: string
  fundoSuave: string
  borda: string
  etiqueta: string
}

/* Classes completas e estáticas para o Tailwind detectar cada cor. */
export const PERSONAGENS: InfoPersonagem[] = [
  {
    nome: "sisi",
    rotulo: "Sisi",
    corNome: "Azul",
    hex: "#3B8FFF",
    fundo: "bg-sisi",
    fundoSuave: "bg-sisi/12",
    borda: "border-sisi",
    etiqueta: "bg-sisi text-white",
  },
  {
    nome: "tata",
    rotulo: "Tata",
    corNome: "Rosa",
    hex: "#FF3C8A",
    fundo: "bg-tata",
    fundoSuave: "bg-tata/12",
    borda: "border-tata",
    etiqueta: "bg-tata text-white",
  },
  {
    nome: "nana",
    rotulo: "Naná",
    corNome: "Roxo",
    hex: "#6B3BFF",
    fundo: "bg-nana",
    fundoSuave: "bg-nana/12",
    borda: "border-nana",
    etiqueta: "bg-nana text-white",
  },
  {
    nome: "belinha",
    rotulo: "Belinha",
    corNome: "Verde",
    hex: "#22C55E",
    fundo: "bg-belinha",
    fundoSuave: "bg-belinha/12",
    borda: "border-belinha",
    etiqueta: "bg-belinha text-tinta",
  },
  {
    nome: "mari",
    rotulo: "Mari",
    corNome: "Amarelo",
    hex: "#FFB81C",
    fundo: "bg-mari",
    fundoSuave: "bg-mari/15",
    borda: "border-mari",
    etiqueta: "bg-mari text-tinta",
  },
]

export const INFO_PERSONAGEM = Object.fromEntries(PERSONAGENS.map((p) => [p.nome, p])) as Record<
  NomePersonagem,
  InfoPersonagem
>

export const usaPersonagemAnimado = (nome: NomePersonagem) => nome === "tata" || nome === "mari"

/* Cores da tela de conversa por personagem. Classes completas e estáticas para o Tailwind detectar cada uma. */
export type CoresSessao = {
  texto: string
  painel: string
  botao: string
  pulso: string
  pulsoSuave: string
  ponto: string
  pontoAtual: string
  pontoVazio: string
  seletorAtivo: string
  borda: string
}

export const CORES_SESSAO: Record<PersonagemJogavel, CoresSessao> = {
  tata: {
    texto: "text-tata",
    painel: "bg-tata/10",
    botao: "bg-tata [--cor-sombra:var(--rosa)]",
    pulso: "bg-tata/30",
    pulsoSuave: "bg-tata/15",
    ponto: "bg-tata",
    pontoAtual: "bg-tata/40",
    pontoVazio: "bg-tata/20",
    seletorAtivo: "bg-tata text-white",
    borda: "border-tata/25",
  },
  sisi: {
    texto: "text-sisi",
    painel: "bg-sisi/15",
    botao: "bg-sisi [--cor-sombra:var(--azul)]",
    pulso: "bg-sisi/30",
    pulsoSuave: "bg-sisi/15",
    ponto: "bg-sisi",
    pontoAtual: "bg-sisi/40",
    pontoVazio: "bg-sisi/20",
    seletorAtivo: "bg-sisi text-white",
    borda: "border-sisi/25",
  },
  nana: {
    texto: "text-nana",
    painel: "bg-nana/12",
    botao: "bg-nana [--cor-sombra:var(--roxo)]",
    pulso: "bg-nana/30",
    pulsoSuave: "bg-nana/15",
    ponto: "bg-nana",
    pontoAtual: "bg-nana/40",
    pontoVazio: "bg-nana/20",
    seletorAtivo: "bg-nana text-white",
    borda: "border-nana/25",
  },
}
