import { ArrowLeft, HeartHandshake, Rocket, Sparkles, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AmostraBotoes() {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border-2 bg-card p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button size="gordinho">
          <HeartHandshake aria-hidden="true" />
          Sou responsável
        </Button>
        <Button size="gordinho" variant="secondary">
          <Stethoscope aria-hidden="true" />
          Sou fonoaudióloga
        </Button>
        <Button size="gordinho" variant="accent">
          <Sparkles aria-hidden="true" />
          Mais uma vez
        </Button>
        <Button size="gordinho" variant="success">
          <Rocket aria-hidden="true" />
          Começar
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg">Tamanho grande</Button>
        <Button size="lg" variant="outline">
          Contorno
        </Button>
        <Button size="lg" variant="ghost">
          <ArrowLeft aria-hidden="true" />
          Voltar
        </Button>
        <Button size="lg" disabled>
          Desabilitado
        </Button>
      </div>
    </div>
  )
}
