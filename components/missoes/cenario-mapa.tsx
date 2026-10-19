const NUVENS = [
  { left: "6%", top: "2%", w: 110 },
  { left: "62%", top: "12%", w: 90 },
  { left: "8%", top: "36%", w: 80 },
]

const MOITAS = [
  { left: "-4%", top: "22%", w: 120, cor: "bg-belinha/70" },
  { left: "86%", top: "44%", w: 110, cor: "bg-belinha/60" },
  { left: "-6%", top: "68%", w: 140, cor: "bg-belinha/70" },
  { left: "82%", top: "88%", w: 130, cor: "bg-belinha/60" },
]

const FLORES = [
  { left: "48%", top: "18%", cor: "bg-tata" },
  { left: "54%", top: "40%", cor: "bg-mari" },
  { left: "44%", top: "60%", cor: "bg-nana" },
  { left: "12%", top: "84%", cor: "bg-tata" },
  { left: "90%", top: "62%", cor: "bg-mari" },
  { left: "20%", top: "30%", cor: "bg-sisi" },
]

export function CenarioMapa() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute inset-x-0 bottom-0 top-[18%] rounded-t-[50%_8%] bg-[#bfeac9]" />
      <div className="absolute inset-x-0 bottom-0 top-[58%] rounded-t-[50%_6%] bg-[#a8e2b6]" />

      {NUVENS.map((n, i) => (
        <div key={i} className="absolute flex items-end" style={{ left: n.left, top: n.top }}>
          <span className="rounded-full bg-card/90" style={{ width: n.w * 0.45, height: n.w * 0.32 }} />
          <span className="-ml-3 rounded-full bg-card/90" style={{ width: n.w * 0.55, height: n.w * 0.45 }} />
          <span className="-ml-4 rounded-full bg-card/90" style={{ width: n.w * 0.4, height: n.w * 0.28 }} />
        </div>
      ))}

      {MOITAS.map((m, i) => (
        <span
          key={i}
          className={`absolute rounded-full ${m.cor}`}
          style={{ left: m.left, top: m.top, width: m.w, height: m.w * 0.7 }}
        />
      ))}

      {FLORES.map((f, i) => (
        <span key={i} className="absolute flex size-4 items-center justify-center" style={{ left: f.left, top: f.top }}>
          <span className={`size-4 rounded-full ${f.cor}`} />
          <span className="absolute size-1.5 rounded-full bg-card" />
        </span>
      ))}
    </div>
  )
}
