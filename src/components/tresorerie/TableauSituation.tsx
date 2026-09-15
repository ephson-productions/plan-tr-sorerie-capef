import { MOIS, formaterMontant } from "@/lib/tresorerie";
import type { SituationTresorerie } from "@/lib/tresorerie";

const LIGNES: { libelle: string; cle: keyof SituationTresorerie; accent?: boolean }[] = [
  { libelle: "Solde initial de trésorerie", cle: "soldeInitial" },
  { libelle: "Total des encaissements (+)", cle: "encaissements" },
  { libelle: "Disponibilités (=)", cle: "disponibilites" },
  { libelle: "Total des décaissements (−)", cle: "decaissements" },
  { libelle: "Solde mensuel (=)", cle: "soldeMensuel" },
  { libelle: "Solde cumulé de trésorerie", cle: "soldeCumule", accent: true },
];

export function TableauSituation({
  situation,
  uniteMonetaire,
  compact = false,
}: {
  situation: SituationTresorerie;
  uniteMonetaire?: string;
  compact?: boolean;
}) {
  return (
    <section>
      {!compact && (
        <>
          <h2 className="font-serif text-xl font-bold text-primary">III — Situation de trésorerie</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tableau entièrement calculé{uniteMonetaire ? ` en ${uniteMonetaire}` : ""} : le solde
            cumulé de chaque mois devient le solde initial du mois suivant.
          </p>
        </>
      )}
      <div className={`overflow-x-auto border border-border bg-card ${compact ? "" : "mt-4"}`}>
        <table className="w-full min-w-[1100px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary">
              <th className="w-10 border-r border-border px-2 py-2 text-left font-semibold text-primary">
                N°
              </th>
              <th className="min-w-[260px] border-r border-border px-3 py-2 text-left font-semibold text-primary">
                Rubriques
              </th>
              {MOIS.map((mois) => (
                <th
                  key={mois}
                  className="border-r border-border px-2 py-2 text-right font-semibold text-primary"
                >
                  {mois}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LIGNES.map((ligne, index) => (
              <tr
                key={ligne.cle}
                className={`border-b border-border last:border-0 ${ligne.accent ? "bg-secondary font-semibold" : ""}`}
              >
                <td className="border-r border-border px-2 py-1.5 text-muted-foreground">
                  {index + 1}
                </td>
                <td className="border-r border-border px-3 py-1.5">{ligne.libelle}</td>
                {situation[ligne.cle].map((valeur, j) => (
                  <td
                    key={j}
                    className={`border-r border-border px-2 py-1.5 text-right tabular-nums ${
                      valeur < 0 ? "font-bold text-destructive" : ""
                    }`}
                  >
                    {formaterMontant(valeur)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
