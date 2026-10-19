export function AmostraTipografia() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="flex flex-col gap-3 rounded-3xl border-2 bg-card p-6">
        <span className="text-sm font-bold uppercase tracking-wide text-primary">Fredoka · títulos e botões</span>
        <p className="font-heading text-5xl font-bold">Vamos brincar!</p>
        <p className="font-heading text-3xl font-semibold">Quem vai falar agora?</p>
        <p className="font-heading text-xl font-medium">Aa Bb Cc 123</p>
      </div>
      <div className="flex flex-col gap-3 rounded-3xl border-2 bg-card p-6">
        <span className="text-sm font-bold uppercase tracking-wide text-secondary">Nunito · texto</span>
        <p className="text-xl font-bold">Texto de destaque para pais e fonoaudiólogas.</p>
        <p className="text-pretty text-lg leading-relaxed">
          O texto corrido é limpo e legível, com bastante espaço entre as linhas para uma leitura tranquila.
        </p>
        <p className="text-muted-foreground">Texto de apoio em tom mais suave.</p>
      </div>
    </div>
  )
}
