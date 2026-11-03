"use client"

import { useState } from "react"
import { LoaderCircle, RefreshCw, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCrianca } from "@/lib/crianca"
import { FalhaAnalise, solicitarAnalise, useAnalise, useAnaliseDisponivel, type CodigoFalha } from "@/lib/analise"
import { ROTULO_SITUACAO, type AnaliseIA, type SituacaoIA } from "@/lib/analise-tipos"
import { INFO_PERSONAGEM } from "@/lib/personagens"
import { DOMINIOS } from "@/lib/resultado"
import { missoesJogadas, useTranscricao } from "@/lib/transcricao"
import { cn } from "@/lib/utils"

const MENSAGEM_ERRO: Record<CodigoFalha, string> = {
  desligada: "A análise por IA não está ligada neste servidor.",
  limite: "Foram muitas análises seguidas. Espere alguns minutos e tente de novo.",
  tempo: "A análise demorou demais e foi interrompida.",
  falha: "Não consegui gerar a análise agora.",
}

const ORIGEM: Record<AnaliseIA["origem"], string> = {
  real: "voz real (texto transcrito pelo navegador)",
  simulado: "respostas simuladas do modo de demonstração",
  misto: "mistura de voz real e respostas simuladas",
}

const CLASSE_SITUACAO: Record<SituacaoIA, string> = {
  dentro: "bg-verde/20 text-tinta",
  atencao: "bg-amarelo/30 text-tinta",
  acima: "bg-azul/20 text-tinta",
  "poucos-dados": "bg-muted text-tinta",
}

/*
 * Controle da análise por IA nos relatórios. Nada é enviado até alguém tocar no botão.
 * Sem a chave no servidor, o botão não aparece e os relatórios seguem com os dados de exemplo.
 */
export function CartaoAnaliseIA() {
  const { idade } = useCrianca()
  const transcricao = useTranscricao()
  const analise = useAnalise()
  const { estado: disponivel, provedor } = useAnaliseDisponivel()
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState<CodigoFalha | null>(null)
  const jogou = missoesJogadas(transcricao).length > 0

  async function analisar() {
    setCarregando(true)
    setErro(null)
    try {
      await solicitarAnalise(idade, transcricao)
    } catch (e) {
      setErro(e instanceof FalhaAnalise ? e.codigo : "falha")
    } finally {
      setCarregando(false)
    }
  }

  const caixa = "flex flex-col gap-3 rounded-3xl border-2 border-roxo/40 bg-roxo/5 p-4 print:break-inside-avoid md:p-5"
  const titulo = (
    <h2 id="t-ia" className="flex items-center gap-2 font-heading text-xl font-bold">
      <Sparkles className="size-5 text-roxo" aria-hidden="true" />
      {analise ? "Análise gerada por IA" : "Análise por IA"}
    </h2>
  )

  if (analise) {
    return (
      <section aria-labelledby="t-ia" className={caixa}>
        {titulo}
        <p className="text-sm font-semibold">
          Gerada por IA{analise.provedor ? ` (${analise.provedor})` : ""} a partir do texto da conversa. É uma proposta, a validar pelas fonoaudiólogas, e não um diagnóstico.
        </p>
        <p className="text-sm text-muted-foreground">
          Missões analisadas: {analise.missoes.join(", ")} · {ORIGEM[analise.origem]}. Não são analisados: fonologia
          (o texto vem do reconhecimento de voz) e tempo de resposta.
        </p>
        {erro && (
          <p role="alert" className="text-sm font-semibold">
            {MENSAGEM_ERRO[erro]} Mantive a análise anterior.
          </p>
        )}
        <div className="print:hidden">
          <Button variant="outline" onClick={analisar} disabled={carregando}>
            {carregando ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : <RefreshCw aria-hidden="true" />}
            {carregando ? "Analisando…" : "Refazer a análise"}
          </Button>
        </div>
      </section>
    )
  }

  if (disponivel === "carregando") return null

  if (disponivel === "nao") {
    return (
      <p role="note" className="rounded-2xl bg-muted px-4 py-3 text-sm font-semibold">
        A análise por IA está desligada nesta versão. Os resultados abaixo são de exemplo.
      </p>
    )
  }

  return (
    <section aria-labelledby="t-ia" className={caixa}>
      {titulo}
      {jogou ? (
        <>
          <p className="text-sm">
            Ao tocar no botão, o texto das respostas e a idade da criança (sem apelido e sem áudio) são enviados ao
            serviço de IA {provedor ? `(${provedor})` : ""} para gerar a análise. Use apenas falas sem informações pessoais.
          </p>
          {erro && (
            <p role="alert" className="text-sm font-semibold">
              {MENSAGEM_ERRO[erro]} O relatório continua com os dados de exemplo.
            </p>
          )}
          <div className="print:hidden">
            <Button size="lg" onClick={analisar} disabled={carregando} className="w-full sm:w-auto">
              {carregando ? <LoaderCircle className="animate-spin" aria-hidden="true" /> : <Sparkles aria-hidden="true" />}
              {carregando ? "Analisando a conversa…" : "Analisar a conversa com IA"}
            </Button>
          </div>
          <p role="status" className="sr-only">
            {carregando ? "Analisando a conversa, aguarde." : ""}
          </p>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          Jogue ao menos uma missão para poder analisar a conversa. Por enquanto, os resultados abaixo são de exemplo.
        </p>
      )}
    </section>
  )
}

/* Os quatro domínios da análise por IA, em categorias (sem nota). */
export function DominiosIA({ analise, variante }: { analise: AnaliseIA; variante: "profissional" | "pais" }) {
  return (
    <div className={cn("grid gap-3", variante === "profissional" && "md:grid-cols-2")}>
      {analise.dominios.map((d) => {
        const base = DOMINIOS.find((x) => x.id === d.id)
        if (!base) return null
        return (
          <article
            key={d.id}
            className="rounded-3xl border-2 border-border bg-card p-4 sombra-suave print:break-inside-avoid md:p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="flex items-center gap-2 font-heading text-lg font-bold">
                <span className={cn("size-3 shrink-0 rounded-full", INFO_PERSONAGEM[base.personagem].fundo)} aria-hidden="true" />
                {base.nome}
              </h3>
              <span className={cn("rounded-full px-3 py-1 text-xs font-bold", CLASSE_SITUACAO[d.situacao])}>
                {ROTULO_SITUACAO[d.situacao]}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85 md:text-base">
              {variante === "pais" ? d.simples : d.tecnico}
            </p>
          </article>
        )
      })}
    </div>
  )
}
