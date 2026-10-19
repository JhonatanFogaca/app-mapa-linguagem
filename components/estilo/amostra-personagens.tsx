import { Personagem } from "@/components/personagem"
import { PersonagemAnimado } from "@/components/personagem-animado"
import { PERSONAGENS, usaPersonagemAnimado } from "@/lib/personagens"
import { cn } from "@/lib/utils"

export function AmostraPersonagens() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {PERSONAGENS.map((p) => (
        <li key={p.nome} className={cn("flex flex-col overflow-hidden rounded-3xl border-2 bg-card", p.borda)}>
          <div className={cn("flex h-52 items-end justify-center overflow-hidden pt-4", p.fundoSuave)}>
            {usaPersonagemAnimado(p.nome) ? (
              <PersonagemAnimado nome={p.nome as "tata" | "mari"} estado="parado" altura={190} />
            ) : (
              <Personagem nome={p.nome} estado="parado" altura={190} />
            )}
          </div>
          <div className="flex flex-col items-start gap-1 p-3">
            <span className={cn("rounded-full px-3 py-0.5 font-heading text-lg font-bold", p.etiqueta)}>
              {p.rotulo}
            </span>
            <span className="text-sm text-muted-foreground">
              {p.corNome} · <span className="font-mono">{p.hex}</span>
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
