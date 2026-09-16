import { MOIS, formaterMontant, totalLigne, totauxMensuels, totalGeneral } from "@/lib/tresorerie";
import type { Grille } from "@/lib/tresorerie";

export function GrilleSaisie({
  titre,
  intituleColonne,
  postes,
  grille,
  onChange,
  uniteMonetaire,
}: {
  titre: string;
  intituleColonne: string;
  postes: readonly string[];
  grille: Grille;
  onChange: (ligne: number, mois: number, valeur: number) => void;
  uniteMonetaire: string;
}) {
  const totauxMois = totauxMensuels(grille);

  return (
    <section>
      <h2 className="font-serif text-xl font-bold text-primary">{titre}</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Montants en {uniteMonetaire}.{"\u00a0"}
      </p>
      <div className="mt-4 overflow-x-auto border border-border bg-card">
        <table className="w-full min-w-[1100px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary">
              <th className="w-10 border-r border-border px-2 py-2 text-left font-semibold text-primary">
                N°
              </th>
              <th className="min-w-[260px] border-r border-border px-3 py-2 text-left font-semibold text-primary">
                {intituleColonne}
              </th>
              {MOIS.map((mois) => (
                <th
                  key={mois}
                  className="border-r border-border px-2 py-2 text-right font-semibold text-primary"
                >
                  {mois}
                </th>
              ))}
              <th className="px-3 py-2 text-right font-semibold text-primary">Total annuel</th>
            </tr>
          </thead>
          <tbody>
            {postes.map((poste, i) => (
              <tr key={poste} className="border-b border-border">
                <td className="border-r border-border px-2 py-1 text-muted-foreground">{i + 1}</td>
                <td className="border-r border-border px-3 py-1">{poste}</td>
                {MOIS.map((mois, j) => (
                  <td key={mois} className="border-r border-border p-0">
                    <input
                      type="number"
                      inputMode="numeric"
                      step="1"
                      value={grille[i]?.[j] === 0 ? "" : (grille[i]?.[j] ?? "")}
                      onChange={(e) => onChange(i, j, Number(e.target.value) || 0)}
                      placeholder="0"
                      aria-label={`${poste} — ${mois}`}
                      className="w-24 bg-transparent px-2 py-1.5 text-right tabular-nums outline-none focus:bg-secondary"
                    />
                  </td>
                ))}
                <td className="px-3 py-1 text-right font-medium tabular-nums">
                  {formaterMontant(totalLigne(grille[i] ?? []))}
                </td>
              </tr>
            ))}
            <tr className="bg-secondary font-semibold">
              <td className="border-r border-border px-2 py-2" />
              <td className="border-r border-border px-3 py-2 text-primary uppercase">
                Total mensuel
              </td>
              {totauxMois.map((total, j) => (
                <td
                  key={j}
                  className="border-r border-border px-2 py-2 text-right tabular-nums text-primary"
                >
                  {formaterMontant(total)}
                </td>
              ))}
              <td className="px-3 py-2 text-right tabular-nums text-primary">
                {formaterMontant(totalGeneral(grille))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
