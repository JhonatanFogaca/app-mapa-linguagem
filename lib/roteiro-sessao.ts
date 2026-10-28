export type Troca = { tata: string; crianca: string }

/** Personagens que já têm missão jogável. */
export type PersonagemJogavel = "tata" | "sisi"

export type Roteiro = {
  personagem: PersonagemJogavel
  rotulo: string
  tema: string
  /* A fala da personagem fica em `tata` por compatibilidade com o relatório; vale para qualquer personagem. */
  trocas: Troca[]
  fimTitulo: string
  fimTexto: string
}

/*
 * TEXTO A VALIDAR (Sisi): o roteiro de Perguntas é uma proposta do desenvolvedor.
 * As perguntas, a ordem e as respostas simuladas precisam ser revisadas pelas fonoaudiólogas.
 */
export const ROTEIROS: Record<PersonagemJogavel, Roteiro> = {
  tata: {
    personagem: "tata",
    rotulo: "Tata",
    tema: "Histórias",
    fimTitulo: "Uhuul! Você ajudou o Pipo!",
    fimTexto: "A Mari veio comemorar com você.",
    trocas: [
      {
        tata: "Oi! Eu sou a Tata. Era uma vez um coelhinho chamado Pipo. Você gosta de coelhos?",
        crianca: "Gosto sim!",
      },
      {
        tata: "O Pipo tinha uma cenoura bem grande. Um dia, ela sumiu! Onde será que ela foi parar?",
        crianca: "Acho que caiu no buraco.",
      },
      {
        tata: "Boa ideia! O Pipo olhou no buraco, mas só achou uma minhoca. O que ele pode fazer agora?",
        crianca: "Pedir ajuda pro amigo.",
      },
      {
        tata: "Isso! Ele chamou a dona Tartaruga. Como você acha que o Pipo está se sentindo?",
        crianca: "Ele tá triste.",
      },
      {
        tata: "Coitadinho! Mas a dona Tartaruga achou a cenoura atrás da árvore. De que cor era a cenoura?",
        crianca: "Era laranja!",
      },
    ],
  },
  sisi: {
    personagem: "sisi",
    rotulo: "Sisi",
    tema: "Perguntas",
    fimTitulo: "Uhuul! Você respondeu tudo!",
    fimTexto: "A Mari veio comemorar suas respostas.",
    trocas: [
      {
        tata: "Oi! Eu sou a Sisi e adoro perguntas! Qual é o seu bichinho favorito?",
        crianca: "É o cachorro!",
      },
      {
        tata: "Que legal! Onde o cachorro gosta de brincar?",
        crianca: "No quintal.",
      },
      {
        tata: "E o que ele gosta de comer?",
        crianca: "Ele come ração.",
      },
      {
        tata: "Por que o cachorro balança o rabo?",
        crianca: "Porque ele tá feliz.",
      },
      {
        tata: "Agora é a sua vez! Que pergunta você quer fazer para mim?",
        crianca: "Você gosta de brincar?",
      },
    ],
  },
}

export function roteiroDaMissao(valor: string | undefined): Roteiro {
  return valor === "sisi" ? ROTEIROS.sisi : ROTEIROS.tata
}

/** Roteiro da Tata, usado hoje pelo relatório profissional (ainda simulado). */
export const ROTEIRO: Troca[] = ROTEIROS.tata.trocas
