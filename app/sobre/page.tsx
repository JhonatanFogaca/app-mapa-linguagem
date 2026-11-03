import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Brain, Mic, ShieldCheck, Sparkles } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { PERSONAGENS } from "@/lib/personagens"
import { Personagem } from "@/components/personagem"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Sobre o projeto | Mapa da Linguagem",
  description: "Como funciona a triagem de fala e linguagem infantil do Mapa da Linguagem.",
}

const ETAPAS = [
  { icone: Sparkles, titulo: "A criança brinca", texto: "Em missões com personagens animadas, ela conversa e conta histórias, sem perceber que está sendo avaliada." },
  { icone: Mic, titulo: "A conversa vira texto", texto: "Com a \"Voz real\" ligada, o navegador transforma a fala em texto. No modo simulado, as respostas vêm do roteiro. O app não grava áudio." },
  { icone: Brain, titulo: "A IA analisa (opcional)", texto: "Se o adulto pedir, o texto das respostas e a idade vão ao serviço de IA da Anthropic, que sugere uma categoria para cada domínio: dentro do esperado, sinal de atenção ou acima do esperado. É uma proposta, a validar pelas fonoaudiólogas, com critérios ainda em definição. Sem a análise, os resultados dos relatórios são de exemplo." },
  { icone: ShieldCheck, titulo: "Dois relatórios", texto: "Um técnico para a fonoaudióloga, com a transcrição da conversa, e outro simples, com dicas, para a família. Sem a análise por IA, os resultados dos domínios são de exemplo." },
]

export default function PaginaSobre() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-6 md:py-10">
      <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "h-11 self-start gap-2 px-3 text-base")}>
        <ArrowLeft className="size-5" aria-hidden="true" />Voltar
      </Link>

      <header className="flex flex-col gap-2">
        <h1 className="text-balance font-heading text-3xl font-bold md:text-4xl">Sobre o projeto</h1>
        <p className="text-lg text-muted-foreground">
          O Mapa da Linguagem é um projeto acadêmico de triagem divertida da fala e da linguagem infantil.
          Esta versão é um protótipo de demonstração: o modo simulado e os resultados de exemplo vêm identificados na tela.
        </p>
      </header>

      <section aria-labelledby="t-como" className="flex flex-col gap-3">
        <h2 id="t-como" className="font-heading text-2xl font-bold">Como funciona</h2>
        <ol className="grid gap-3 sm:grid-cols-2">
          {ETAPAS.map((e, i) => (
            <li key={e.titulo} className="flex flex-col gap-2 rounded-3xl border-2 border-border bg-card p-4 sombra-suave">
              <span className="flex items-center gap-2 font-heading text-lg font-bold">
                <span className="flex size-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <e.icone className="size-5" aria-hidden="true" />
                </span>
                {i + 1}. {e.titulo}
              </span>
              <p className="text-sm leading-relaxed md:text-base">{e.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="t-turma" className="flex flex-col gap-3">
        <h2 id="t-turma" className="font-heading text-2xl font-bold">As personagens</h2>
        <ul className="flex flex-wrap justify-center gap-4 rounded-3xl bg-ceu p-5">
          {PERSONAGENS.map((p) => (
            <li key={p.nome} className="flex flex-col items-center gap-1">
              <Personagem nome={p.nome} altura={110} estado="parado" />
              <span className={cn("rounded-full px-3 py-0.5 font-heading text-sm font-bold", p.etiqueta)}>{p.rotulo}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="t-lgpd" className="flex flex-col gap-2 rounded-3xl border-2 border-amarelo bg-amarelo/15 p-5">
        <h2 id="t-lgpd" className="font-heading text-2xl font-bold">Privacidade e limites</h2>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>É uma triagem, não um diagnóstico. Só um(a) fonoaudiólogo(a) avalia a criança.</li>
          <li>Pedimos apenas apelido e idade, nunca o nome completo.</li>
          <li>O uso da voz depende do consentimento do responsável (LGPD).</li>
          <li>
            O app não grava áudio. Guarda só apelido, idade e o texto das respostas, no seu navegador, até a aba ser
            fechada.
          </li>
          <li>
            Com a &quot;Voz real&quot; ligada, o navegador transforma a fala em texto. No Chrome, o áudio vai ao Google
            apenas para essa transcrição. No modo simulado, nada é captado.
          </li>
          <li>
            A análise por IA é opcional e só acontece quando o adulto toca no botão do relatório. Aí, o texto das
            respostas e a idade (sem apelido e sem áudio) são enviados ao serviço de IA da Anthropic. Na demonstração,
            use apenas falas de adultos, sem informações pessoais.
          </li>
        </ul>
      </section>
    </main>
  )
}
