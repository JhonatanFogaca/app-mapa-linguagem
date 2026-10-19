"use client"

import { useState } from "react"
import { IndicadorProgresso } from "./indicador-progresso"
import { TelaBoasVindas } from "./tela-boas-vindas"
import { TelaConsentimento } from "./tela-consentimento"
import { TelaCadastro } from "./tela-cadastro"
import { TelaRelatorioEmBreve } from "./tela-relatorio-em-breve"

export type Etapa = "boas-vindas" | "consentimento" | "cadastro" | "fono"

const PASSOS_RESPONSAVEL: Etapa[] = ["boas-vindas", "consentimento", "cadastro"]

export function FluxoEntrada() {
  const [etapa, setEtapa] = useState<Etapa>("boas-vindas")
  const [entradaJaExibida, setEntradaJaExibida] = useState(false)
  const [consentiu, setConsentiu] = useState(false)

  const irPara = (proxima: Etapa) => {
    if (etapa === "boas-vindas") setEntradaJaExibida(true)
    setEtapa(proxima)
    window.scrollTo({ top: 0 })
  }

  const passoAtual = PASSOS_RESPONSAVEL.indexOf(etapa)

  return (
    <div className="flex flex-1 flex-col">
      {passoAtual >= 0 && (
        <div className="px-4 pt-5 md:pt-8">
          <IndicadorProgresso passoAtual={passoAtual} />
        </div>
      )}

      <main className="flex flex-1 flex-col">
        {etapa === "boas-vindas" && (
          <TelaBoasVindas
            animarEntrada={!entradaJaExibida}
            onResponsavel={() => irPara("consentimento")}
            onFono={() => irPara("fono")}
          />
        )}
        {etapa === "consentimento" && (
          <TelaConsentimento
            consentiu={consentiu}
            onConsentimentoChange={setConsentiu}
            onVoltar={() => irPara("boas-vindas")}
            onContinuar={() => irPara("cadastro")}
          />
        )}
        {etapa === "cadastro" && <TelaCadastro onVoltar={() => irPara("consentimento")} />}
        {etapa === "fono" && <TelaRelatorioEmBreve onVoltar={() => irPara("boas-vindas")} />}
      </main>
    </div>
  )
}
