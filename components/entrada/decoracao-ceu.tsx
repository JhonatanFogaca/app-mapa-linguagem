import { Cloud, Sparkle, Star } from "lucide-react"

export function DecoracaoCeu() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <Cloud className="absolute top-4 -left-6 size-24 fill-card text-ceu md:size-36" strokeWidth={1.25} />
      <Cloud className="absolute top-24 -right-8 size-20 fill-card text-ceu md:top-16 md:size-32" strokeWidth={1.25} />
      <Star className="absolute top-6 right-1/4 size-5 fill-amarelo text-amarelo md:size-7" />
      <Star className="absolute top-40 left-8 size-4 fill-amarelo text-amarelo md:left-1/5 md:size-5" />
      <Sparkle className="absolute top-14 left-1/3 size-4 fill-amarelo text-amarelo" />
      <Sparkle className="absolute top-48 right-10 size-5 fill-rosa/60 text-rosa/60 md:right-1/5" />
    </div>
  )
}
