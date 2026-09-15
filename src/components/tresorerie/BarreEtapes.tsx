export const ETAPES = [
  "Informations générales",
  "Encaissements",
  "Décaissements",
  "Situation de trésorerie",
  "Aperçu et impression",
] as const;

export function BarreEtapes({
  etape,
  onChange,
}: {
  etape: number;
  onChange: (etape: number) => void;
}) {
  return (
    <nav className="sans-impression border-y border-border bg-card">
      <ol className="mx-auto flex max-w-[1400px] flex-wrap">
        {ETAPES.map((libelle, index) => {
          const numero = index + 1;
          const active = numero === etape;
          const complete = numero < etape;
          return (
            <li key={libelle} className="flex-1 min-w-[180px] border-r border-border last:border-0">
              <button
                type="button"
                onClick={() => onChange(numero)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : complete
                      ? "text-primary hover:bg-secondary"
                      : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <span
                  className={`font-serif text-lg font-bold ${active ? "" : complete ? "text-accent" : ""}`}
                >
                  {String(numero).padStart(2, "0")}
                </span>
                <span className="text-sm leading-tight">{libelle}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
