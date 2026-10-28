import { MISSOES, statusDaMissao } from "@/lib/missoes"
import { BarraProgresso } from "@/components/missoes/barra-progresso"
import { ParadaMissao } from "@/components/missoes/parada-missao"
import { CenarioMapa } from "@/components/missoes/cenario-mapa"

function caminhoCurvo() {
  const [primeiro, ...resto] = MISSOES
  let d = `M ${primeiro.x} ${primeiro.y}`
  let anterior = primeiro
  for (const ponto of resto) {
    const meio = (anterior.y + ponto.y) / 2
    d += ` C ${anterior.x} ${meio}, ${ponto.x} ${meio}, ${ponto.x} ${ponto.y}`
    anterior = ponto
  }
  return d
}

export function MapaMissoes({ concluidas }: { concluidas: number }) {
  const caminho = caminhoCurvo()

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 md:px-6 md:py-10">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-balance text-3xl font-bold md:text-4xl">Mapa de missões</h1>
        <p className="text-pretty text-muted-foreground md:text-lg">
          Siga o caminho e descubra uma amiga nova em cada parada.
        </p>
      </div>

      <BarraProgresso atual={concluidas} total={MISSOES.length} />

      <section
        aria-label="Mapa com as paradas das missões"
        className="relative h-[1080px] overflow-hidden rounded-[2.5rem] border-4 border-card bg-ceu sombra-suave md:h-[1120px]"
      >
        <CenarioMapa />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={caminho} fill="none" stroke="#f6dfb4" strokeWidth={34} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path
            d={caminho}
            fill="none"
            stroke="#ffffff"
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray="2 16"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <ol className="contents">
          {MISSOES.map((missao, indice) => {
            const status = statusDaMissao(indice, concluidas)
            /* key com o status: ao liberar uma parada, ela remonta e a personagem "entra" animada. */
            return <ParadaMissao key={`${missao.personagem}-${status}`} missao={missao} numero={indice + 1} status={status} />
          })}
        </ol>
      </section>
    </main>
  )
}
