import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Props = {
  lado: "esquerda" | "direita"
  autor: string
  children: ReactNode
  className?: string
}

export function BalaoFala({ lado, autor, children, className }: Props) {
  const daTata = lado === "esquerda"

  return (
    <div className={cn("relative max-w-md", className)}>
      <span
        className={cn(
          "mb-1 block font-heading text-sm font-bold",
          daTata ? "text-tata" : "text-right text-primary",
        )}
      >
        {autor}
      </span>
      <div
        className={cn(
          "relative rounded-[1.75rem] px-5 py-4 text-pretty font-heading text-lg font-medium leading-snug md:text-xl",
          daTata
            ? "rounded-tl-md border-4 border-tata/25 bg-card text-foreground sombra-suave"
            : "rounded-tr-md bg-primary text-primary-foreground sombra-gordinha [--cor-sombra:var(--primary)]",
        )}
      >
        {children}
      </div>
    </div>
  )
}
