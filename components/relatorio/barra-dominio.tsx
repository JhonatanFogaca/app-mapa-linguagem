import type { Dominio } from "@/lib/resultado"
import { situacao } from "@/lib/resultado"
import { INFO_PERSONAGEM } from "@/lib/personagens"

const ROTULO = { dentro: "Dentro do esperado", atencao: "Merece atenção", acima: "Acima do esperado" }

export function BarraDominio({ d, texto }: { d: Dominio; texto: string }) {
  const info = INFO_PERSONAGEM[d.personagem]
  const s = situacao(d)
  return (
    <article className="rounded-3xl border-2 border-border bg-card p-4 sombra-suave md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-heading text-lg font-bold">{d.nome}</h3>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${s === "atencao" ? "bg-amarelo/30 text-tinta" : "bg-verde/20 text-tinta"}`}>
          {ROTULO[s]}
        </span>
      </div>
      <div className="relative mt-3 h-4 rounded-full bg-muted" role="img" aria-label={`${d.pontos} de 100. Faixa esperada de ${d.faixaMin} a ${d.faixaMax}.`}>
        <span className="absolute inset-y-0 rounded-full bg-verde/25" style={{ left: `${d.faixaMin}%`, width: `${d.faixaMax - d.faixaMin}%` }} aria-hidden="true" />
        <span className={`absolute inset-y-0 left-0 rounded-full ${info.fundo}`} style={{ width: `${d.pontos}%` }} aria-hidden="true" />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground/85 md:text-base">{texto}</p>
    </article>
  )
}
