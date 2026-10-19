"use client"

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts"
import { DOMINIOS } from "@/lib/resultado"

const DADOS = DOMINIOS.map((d) => ({
  nome: d.nome.split(" e ")[0],
  crianca: d.pontos,
  esperado: (d.faixaMin + d.faixaMax) / 2,
}))

export function GraficoRadar() {
  return (
    <figure className="m-0">
      <div className="h-72 w-full md:h-80" role="img" aria-label={`Gráfico radar: ${DOMINIOS.map((d) => `${d.nome} ${d.pontos}`).join(", ")}`}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={DADOS} outerRadius="70%">
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis dataKey="nome" tick={{ fill: "var(--tinta)", fontSize: 13, fontWeight: 700 }} />
            <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
            <Radar name="Esperado" dataKey="esperado" stroke="var(--verde)" fill="var(--verde)" fillOpacity={0.15} strokeDasharray="5 4" isAnimationActive={false} />
            <Radar name="Criança" dataKey="crianca" stroke="var(--azul)" fill="var(--azul)" fillOpacity={0.35} strokeWidth={3} isAnimationActive={false} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="mt-2 flex flex-wrap justify-center gap-4 text-sm font-semibold">
        <span className="flex items-center gap-2"><span className="size-3 rounded-full bg-azul" aria-hidden="true" />Criança</span>
        <span className="flex items-center gap-2"><span className="size-3 rounded-full border-2 border-dashed border-verde" aria-hidden="true" />Média esperada</span>
      </figcaption>
    </figure>
  )
}
