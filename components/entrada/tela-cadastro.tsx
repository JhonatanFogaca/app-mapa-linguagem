"use client"

import { useState, type FormEvent } from "react"
import { Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MolduraTela } from "./moldura-tela"

const IDADES = [3, 4, 5, 6, 7, 8, 9, 10]

export function TelaCadastro({ onVoltar }: { onVoltar: () => void }) {
  const [apelido, setApelido] = useState("")
  const [idade, setIdade] = useState<number | null>(null)
  const [pronto, setPronto] = useState(false)

  const valido = apelido.trim().length > 0 && idade !== null

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    if (valido) setPronto(true)
  }

  return (
    <MolduraTela titulo="Quem vai brincar?" onVoltar={onVoltar}>
      <form onSubmit={enviar} className="flex flex-1 flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="apelido" className="text-lg font-bold">
            Apelido da criança
          </label>
          <input
            id="apelido"
            name="apelido"
            autoComplete="off"
            maxLength={20}
            required
            value={apelido}
            onChange={(e) => {
              setApelido(e.target.value)
              setPronto(false)
            }}
            placeholder="Ex.: Juju"
            className="h-14 rounded-3xl border-2 border-input bg-card px-4 text-lg outline-none placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20"
          />
          <p className="text-sm text-muted-foreground">Não use o nome completo.</p>
        </div>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-2 text-lg font-bold">Idade</legend>
          <div className="grid grid-cols-4 gap-2">
            {IDADES.map((n) => (
              <label key={n} className="relative">
                <input
                  type="radio"
                  name="idade"
                  value={n}
                  checked={idade === n}
                  onChange={() => {
                    setIdade(n)
                    setPronto(false)
                  }}
                  className="peer sr-only"
                />
                <span className="flex h-16 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-input bg-card font-heading text-2xl font-semibold transition-all peer-checked:-translate-y-0.5 peer-checked:border-primary peer-checked:bg-primary peer-checked:sombra-gordinha peer-checked:text-primary-foreground peer-focus-visible:ring-4 peer-focus-visible:ring-primary/30 hover:border-primary/50">
                  {n}
                  <span className="font-sans text-xs font-semibold">anos</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-auto flex flex-col gap-3">
          <p role="status" className="min-h-6 text-center font-semibold text-roxo">
            {pronto && `Tudo pronto, ${apelido.trim()}! A aventura começa em breve.`}
          </p>
          <Button type="submit" size="gordinho" disabled={!valido}>
            <Rocket className="size-6" aria-hidden="true" />
            Começar a aventura
          </Button>
        </div>
      </form>
    </MolduraTela>
  )
}
