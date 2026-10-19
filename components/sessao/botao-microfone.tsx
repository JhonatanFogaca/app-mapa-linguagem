"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Mic } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  gravando: boolean
  disponivel: boolean
  onGravar: () => void
}

const ALTURAS_ONDA = [0.4, 0.75, 1, 0.6, 0.9, 0.5, 0.8]

export function BotaoMicrofone({ gravando, disponivel, onGravar }: Props) {
  const reduzirMovimento = useReducedMotion()
  const pulsando = disponivel && !gravando

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex size-36 items-center justify-center md:size-40">
        {pulsando && (
          <>
            <span className="absolute inset-0 rounded-full bg-tata/30 motion-safe:animate-ping" aria-hidden="true" />
            <span className="absolute -inset-3 rounded-full bg-tata/15 motion-safe:animate-pulse" aria-hidden="true" />
          </>
        )}
        <button
          type="button"
          onClick={onGravar}
          disabled={!disponivel || gravando}
          aria-label={gravando ? "Gravando sua resposta" : "Segure para falar"}
          className={cn(
            "relative flex size-36 items-center justify-center rounded-full text-white outline-none transition-all focus-visible:ring-8 focus-visible:ring-ring/40 md:size-40",
            "bg-tata sombra-gordinha [--cor-sombra:var(--tata)] active:translate-y-1",
            "disabled:cursor-not-allowed",
            !disponivel && !gravando && "bg-muted-foreground/40 shadow-none",
            gravando && "scale-95",
          )}
        >
          {gravando ? (
            <span className="flex h-16 items-center gap-1.5" aria-hidden="true">
              {ALTURAS_ONDA.map((altura, i) => (
                <motion.span
                  key={i}
                  className="w-2 rounded-full bg-white"
                  style={{ height: `${altura * 100}%` }}
                  animate={reduzirMovimento ? undefined : { scaleY: [0.3, 1, 0.45, 0.9, 0.3] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
                />
              ))}
            </span>
          ) : (
            <Mic className="size-16" strokeWidth={2.5} aria-hidden="true" />
          )}
        </button>
      </div>
      <p className="font-heading text-xl font-bold" aria-live="polite">
        {gravando ? "Estou ouvindo..." : disponivel ? "Segure para falar" : "A Tata está falando..."}
      </p>
    </div>
  )
}
