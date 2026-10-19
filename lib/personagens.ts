import type { NomePersonagem } from "@/components/personagem"

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
