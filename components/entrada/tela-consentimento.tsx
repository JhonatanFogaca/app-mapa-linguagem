import { Mic, ShieldCheck, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MolduraTela } from "./moldura-tela"

type Props = {
  consentiu: boolean
  onConsentimentoChange: (valor: boolean) => void
  onVoltar: () => void
  onContinuar: () => void
}

const ITENS = [
  {
    icone: Mic,
    titulo: "A conversa será gravada",
    texto: "Durante as brincadeiras, gravamos a voz da criança para analisar como ela fala e se comunica.",
  },
  {
    icone: Stethoscope,
    titulo: "É uma triagem, não um diagnóstico",
    texto: "O app ajuda a perceber sinais de atenção. Ele não substitui a avaliação de um fonoaudiólogo ou outro profissional.",
  },
  {
    icone: ShieldCheck,
    titulo: "Os dados são protegidos",
    texto: "A voz de crianças é um dado sensível. Ela é tratada e protegida conforme a LGPD (Lei Geral de Proteção de Dados).",
  },
]

const CORES_ICONE = ["bg-azul", "bg-roxo", "bg-rosa"]

export function TelaConsentimento({ consentiu, onConsentimentoChange, onVoltar, onContinuar }: Props) {
  return (
    <MolduraTela titulo="Antes de começar" onVoltar={onVoltar}>
      <p className="text-pretty text-lg text-muted-foreground">
        Leia com calma. É rapidinho e importante.
      </p>

      <ul className="flex flex-col gap-3">
        {ITENS.map(({ icone: Icone, titulo, texto }, i) => (
          <li key={titulo} className="flex gap-4 rounded-3xl border-2 bg-card p-4 sombra-suave">
            <span
              className={`flex size-12 shrink-0 items-center justify-center rounded-2xl text-white ${CORES_ICONE[i]}`}
            >
              <Icone className="size-6" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="font-heading text-lg font-semibold">{titulo}</h2>
              <p className="text-pretty leading-relaxed text-muted-foreground">{texto}</p>
            </div>
          </li>
        ))}
      </ul>

      <label className="flex cursor-pointer items-center gap-3 rounded-3xl border-2 border-dashed border-primary/40 bg-card p-4 has-checked:border-solid has-checked:border-primary has-checked:bg-primary/5 has-focus-visible:ring-4 has-focus-visible:ring-primary/25">
        <input
          type="checkbox"
          required
          checked={consentiu}
          onChange={(e) => onConsentimentoChange(e.target.checked)}
          className="size-6 shrink-0 cursor-pointer accent-primary outline-none"
        />
        <span className="text-lg font-bold">Li e autorizo</span>
      </label>

      <Button size="gordinho" onClick={onContinuar} disabled={!consentiu} className="mt-auto">
        Continuar
      </Button>
    </MolduraTela>
  )
}
