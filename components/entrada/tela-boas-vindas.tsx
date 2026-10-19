import Link from "next/link"
import { HeartHandshake, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DecoracaoCeu } from "./decoracao-ceu"
import { DesfilePersonagens } from "./desfile-personagens"

type Props = {
  animarEntrada: boolean
  onResponsavel: () => void
  onFono: () => void
}

export function TelaBoasVindas({ animarEntrada, onResponsavel, onFono }: Props) {
  return (
    <section
      aria-labelledby="titulo-boas-vindas"
      className="relative flex flex-1 flex-col items-center justify-center gap-6 px-4 py-8 md:gap-10"
    >
      <DecoracaoCeu />

      <div className="relative flex flex-col items-center gap-2 text-center">
        <h1
          id="titulo-boas-vindas"
          className="text-balance font-heading text-4xl font-bold text-primary md:text-6xl"
        >
          Mapa da Linguagem
        </h1>
        <p className="max-w-md text-pretty text-lg text-muted-foreground md:text-xl">
          Triagem divertida da fala e linguagem infantil
        </p>
      </div>

      <div className="relative w-full">
        <DesfilePersonagens animarEntrada={animarEntrada} />
        <div aria-hidden="true" className="mx-auto -mt-3 h-6 w-full max-w-lg rounded-[50%] bg-azul/10" />
      </div>

      <div className="relative flex w-full max-w-md flex-col gap-3 md:flex-row md:max-w-xl">
        <Button size="gordinho" onClick={onResponsavel} className="flex-1">
          <HeartHandshake aria-hidden="true" />
          Sou responsável
        </Button>
        <Button size="gordinho" variant="secondary" onClick={onFono} className="flex-1">
          <Stethoscope aria-hidden="true" />
          Sou fonoaudióloga
        </Button>
      </div>

      <Link
        href="/sobre"
        className="relative rounded-xl px-2 py-1 text-base font-semibold text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-4 focus-visible:ring-ring/40"
      >
        Saiba mais sobre o projeto
      </Link>
    </section>
  )
}
