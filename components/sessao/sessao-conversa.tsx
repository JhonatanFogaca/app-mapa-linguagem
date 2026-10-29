"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Clock } from "lucide-react"
import { Personagem } from "@/components/personagem"
import { PersonagemAnimado, type EstadoAnimado } from "@/components/personagem-animado"
import { buttonVariants } from "@/components/ui/button"
import { BalaoFala } from "@/components/sessao/balao-fala"
import { BotaoMicrofone } from "@/components/sessao/botao-microfone"
import { Confete } from "@/components/sessao/confete"
import { SeletorModoVoz, type ModoVoz } from "@/components/sessao/seletor-modo-voz"
import { useReconhecimentoVoz, type ErroVoz } from "@/hooks/use-reconhecimento-voz"
import { CORES_SESSAO, usaPersonagemAnimado } from "@/lib/personagens"
import { MISSOES } from "@/lib/missoes"
import { concluirMissao } from "@/lib/progresso"
import type { Roteiro } from "@/lib/roteiro-sessao"
import { gravarResposta, type OrigemResposta } from "@/lib/transcricao"
import { cn } from "@/lib/utils"

type Fase = "tata" | "aguardando" | "gravando" | "fim"

const MENSAGENS_VOZ: Record<ErroVoz, string> = {
  "sem-fala": "Não consegui te ouvir. Vamos tentar de novo?",
  "sem-permissao": "Preciso do microfone. Peça a um adulto para liberar nas permissões do navegador.",
  indisponivel: "A voz não funcionou agora. Tente de novo ou use o modo simulado.",
}

const DURACAO_TOTAL = 10 * 60
const INICIO_CRONOMETRO = 2 * 60 + 30
const formatar = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`

export function SessaoConversa({ roteiro }: { roteiro: Roteiro }) {
  const ROTEIRO = roteiro.trocas
  const cores = CORES_SESSAO[roteiro.personagem]
  const numeroMissao = MISSOES.findIndex((m) => m.personagem === roteiro.personagem) + 1
  const [indice, setIndice] = useState(0)
  const [fase, setFase] = useState<Fase>("tata")
  const [palavrasVisiveis, setPalavrasVisiveis] = useState(0)
  const [falaCrianca, setFalaCrianca] = useState<string | null>(null)
  const [estadoMari, setEstadoMari] = useState<EstadoAnimado>("entrando")
  const [segundos, setSegundos] = useState(INICIO_CRONOMETRO)
  const [modo, setModo] = useState<ModoVoz>("simulado")
  const [avisoVoz, setAvisoVoz] = useState<string | null>(null)
  const temporizadores = useRef<ReturnType<typeof setTimeout>[]>([])

  const troca = ROTEIRO[indice]
  const palavras = troca.tata.split(" ")
  const tataFalando = fase === "tata" && palavrasVisiveis < palavras.length

  useEffect(() => {
    if (fase !== "tata") return
    if (palavrasVisiveis >= palavras.length) {
      const t = setTimeout(() => setFase("aguardando"), 350)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setPalavrasVisiveis((p) => p + 1), palavrasVisiveis === 0 ? 600 : 230)
    return () => clearTimeout(t)
  }, [fase, palavrasVisiveis, palavras.length])

  useEffect(() => {
    if (fase === "fim") concluirMissao(numeroMissao)
  }, [fase, numeroMissao])

  useEffect(() => {
    if (fase !== "fim") return
    const t = setTimeout(() => setEstadoMari("comemorando"), 1000)
    return () => clearTimeout(t)
  }, [fase])

  useEffect(() => {
    if (fase === "fim") return
    const t = setInterval(() => setSegundos((s) => Math.min(s + 1, DURACAO_TOTAL)), 1000)
    return () => clearInterval(t)
  }, [fase])

  useEffect(() => {
    const pendentes = temporizadores.current
    return () => pendentes.forEach(clearTimeout)
  }, [])

  function agendar(acao: () => void, ms: number) {
    temporizadores.current.push(setTimeout(acao, ms))
  }

  function concluirTroca(fala: string, origem: OrigemResposta) {
    gravarResposta(roteiro.personagem, indice, fala, origem)
    setFalaCrianca(fala)
    const ultima = indice === ROTEIRO.length - 1
    agendar(() => {
      if (ultima) {
        setFase("fim")
        return
      }
      setIndice((i) => i + 1)
      setPalavrasVisiveis(0)
      setFase("tata")
    }, ultima ? 1200 : 1500)
  }

  function falhouVoz(erro: ErroVoz) {
    setFase("aguardando")
    setAvisoVoz(MENSAGENS_VOZ[erro])
  }

  const voz = useReconhecimentoVoz({ onTexto: (texto) => concluirTroca(texto, "real"), onErro: falhouVoz })

  function gravar() {
    if (fase !== "aguardando") return
    setFase("gravando")
    setFalaCrianca(null)
    setAvisoVoz(null)
    if (modo === "real") {
      voz.iniciar()
      return
    }
    agendar(() => concluirTroca(troca.crianca, "simulado"), 2000)
  }

  function mudarModo(novo: ModoVoz) {
    setModo(novo)
    setAvisoVoz(null)
  }

  const terminou = fase === "fim"

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className={cn("font-heading text-sm font-bold uppercase tracking-wide", cores.texto)}>{roteiro.tema}</span>
          <h1 className="text-balance text-2xl font-bold md:text-3xl">Conversa com a {roteiro.rotulo}</h1>
        </div>
        <div
          className="flex items-center gap-1.5 rounded-full border-2 border-border bg-card px-3 py-1.5 text-sm font-semibold tabular-nums text-muted-foreground"
          aria-label={`Tempo da sessão: ${formatar(segundos)} de ${formatar(DURACAO_TOTAL)}`}
        >
          <Clock className="size-4" aria-hidden="true" />
          <span aria-hidden="true">
            {formatar(segundos)} / {formatar(DURACAO_TOTAL)}
          </span>
        </div>
      </div>

      <section
        aria-label="Conversa"
        className={cn("relative flex flex-col gap-6 overflow-hidden rounded-[2.5rem] border-4 border-card p-5 sombra-suave md:p-8", cores.painel)}
      >
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-end md:gap-6">
          <div className="shrink-0">
            {usaPersonagemAnimado(roteiro.personagem) ? (
              <PersonagemAnimado nome={roteiro.personagem} altura={320} estado={tataFalando ? "falando" : "parado"} />
            ) : (
              <Personagem nome={roteiro.personagem} altura={320} estado={tataFalando ? "falando" : "parado"} />
            )}
          </div>

          <div className="flex w-full flex-1 flex-col gap-5 md:pb-10">
            <BalaoFala lado="esquerda" autor={roteiro.rotulo} corNome={cores.texto} corBorda={cores.borda} className="self-start">
              <span aria-hidden="true">
                {palavras.map((palavra, i) => (
                  <span key={`${indice}-${i}`} className={cn("transition-opacity duration-200", i < palavrasVisiveis ? "opacity-100" : "opacity-0")}>
                    {palavra}{" "}
                  </span>
                ))}
              </span>
              <span className="sr-only">{troca.tata}</span>
            </BalaoFala>

            <AnimatePresence mode="wait">
              {falaCrianca && (
                <motion.div
                  key={falaCrianca}
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="self-end"
                  aria-live="polite"
                >
                  <BalaoFala lado="direita" autor="Você">
                    {falaCrianca}
                  </BalaoFala>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <ol className="flex justify-center gap-2" aria-label={`Troca ${Math.min(indice + 1, ROTEIRO.length)} de ${ROTEIRO.length}`}>
          {ROTEIRO.map((_, i) => (
            <li
              key={i}
              className={cn(
                "h-2.5 rounded-full transition-all",
                i < indice || (i === indice && falaCrianca) ? `w-6 ${cores.ponto}` : i === indice ? `w-6 ${cores.pontoAtual}` : `w-2.5 ${cores.pontoVazio}`,
              )}
            />
          ))}
        </ol>
      </section>

      <div className="flex justify-center pb-6">
        {terminou ? (
          <div className="flex flex-col items-center gap-3 text-center">
            <PersonagemAnimado nome="mari" altura={240} estado={estadoMari} />
            <h2 className="text-balance text-3xl font-bold" aria-live="polite">
              {roteiro.fimTitulo}
            </h2>
            <p className="text-pretty text-muted-foreground">{roteiro.fimTexto}</p>
            <Link
              href="/relatorio/pais"
              className={cn(buttonVariants({ variant: "accent", size: "gordinho" }), "mt-2")}
            >
              Ver resultado
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/missoes" className={buttonVariants({ variant: "outline", size: "gordinho" })}>
              Voltar ao mapa
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5">
            <BotaoMicrofone gravando={fase === "gravando"} disponivel={fase === "aguardando"} onGravar={gravar} cores={cores} />
            {avisoVoz && (
              <p role="alert" className="max-w-md text-balance rounded-2xl bg-card px-4 py-3 text-center font-semibold">
                {avisoVoz}
              </p>
            )}
            <SeletorModoVoz
              modo={modo}
              onMudar={mudarModo}
              vozDisponivel={voz.suportado}
              desabilitado={fase === "gravando"}
              cores={cores}
            />
          </div>
        )}
      </div>

      {terminou && <Confete />}
    </main>
  )
}
