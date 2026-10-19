const CORES = [
  { nome: "Azul", token: "primary", hex: "#3B8FFF", classe: "bg-azul" },
  { nome: "Rosa", token: "secondary", hex: "#FF3C8A", classe: "bg-rosa" },
  { nome: "Amarelo", token: "accent", hex: "#FFB81C", classe: "bg-amarelo" },
  { nome: "Roxo", token: "roxo", hex: "#6B3BFF", classe: "bg-roxo" },
  { nome: "Verde", token: "success", hex: "#22C55E", classe: "bg-verde" },
  { nome: "Vermelho", token: "destructive", hex: "#EF4444", classe: "bg-vermelho" },
  { nome: "Creme", token: "background", hex: "#FFF9F0", classe: "bg-creme border-2" },
  { nome: "Texto", token: "foreground", hex: "#2B2B3A", classe: "bg-tinta" },
]

export function AmostraCores() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {CORES.map((cor) => (
        <li key={cor.nome} className="flex flex-col overflow-hidden rounded-3xl border-2 bg-card">
          <span aria-hidden="true" className={`m-2 mb-0 h-20 rounded-2xl ${cor.classe}`} />
          <div className="flex flex-col p-3">
            <span className="font-heading text-lg font-semibold">{cor.nome}</span>
            <span className="font-mono text-sm text-muted-foreground">{cor.hex}</span>
            <span className="text-sm text-muted-foreground">--{cor.token}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
