import {
  MOIS,
  POSTES_DECAISSEMENTS,
  POSTES_ENCAISSEMENTS,
  formaterMontant,
  totalGeneral,
  totalLigne,
  totauxMensuels,
} from "@/lib/tresorerie";
import type { Grille, SituationTresorerie } from "@/lib/tresorerie";
import { TableauSituation } from "./TableauSituation";

function TableauLecture({
  titre,
  intituleColonne,
  postes,
  grille,
  libelleTotal,
}: {
  titre: string;
  intituleColonne: string;
  postes: readonly string[];
  grille: Grille;
  libelleTotal: string;
}) {
  const totauxMois = totauxMensuels(grille);
  return (
    <section className="bloc-impression">
      <h3 className="mb-1 font-serif text-sm font-bold text-primary uppercase">{titre}</h3>
      <table className="w-full border-collapse border border-border text-[11px]">
        <thead>
          <tr className="bg-secondary">
            <th className="border border-border px-1 py-1 text-left font-semibold text-primary">
              N°
            </th>
            <th className="border border-border px-2 py-1 text-left font-semibold text-primary">
              {intituleColonne}
            </th>
            {MOIS.map((mois) => (
              <th
                key={mois}
                className="border border-border px-1 py-1 text-right font-semibold text-primary"
              >
                {mois}
              </th>
            ))}
            <th className="border border-border px-1 py-1 text-right font-semibold text-primary">
              Total annuel
            </th>
          </tr>
        </thead>
        <tbody>
          {postes.map((poste, i) => (
            <tr key={poste}>
              <td className="border border-border px-1 py-0.5">{i + 1}</td>
              <td className="border border-border px-2 py-0.5">{poste}</td>
              {MOIS.map((mois, j) => (
                <td key={mois} className="border border-border px-1 py-0.5 text-right tabular-nums">
                  {formaterMontant(grille[i]?.[j] ?? 0)}
                </td>
              ))}
              <td className="border border-border px-1 py-0.5 text-right font-medium tabular-nums">
                {formaterMontant(totalLigne(grille[i] ?? []))}
              </td>
            </tr>
          ))}
          <tr className="bg-secondary font-semibold">
            <td className="border border-border px-1 py-1" />
            <td className="border border-border px-2 py-1 text-primary uppercase">
              {libelleTotal}
            </td>
            {totauxMois.map((total, j) => (
              <td
                key={j}
                className="border border-border px-1 py-1 text-right tabular-nums text-primary"
              >
                {formaterMontant(total)}
              </td>
            ))}
            <td className="border border-border px-1 py-1 text-right tabular-nums text-primary">
              {formaterMontant(totalGeneral(grille))}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export function ApercuImpression({
  exercice,
  periode,
  uniteMonetaire,
  institution,
  encaissements,
  decaissements,
  situation,
}: {
  exercice: number;
  periode: string;
  uniteMonetaire: string;
  institution: string;
  encaissements: Grille;
  decaissements: Grille;
  situation: SituationTresorerie;
}) {
  return (
    <div className="zone-impression bg-white p-6 text-foreground">
      {/* Zone réservée à l'en-tête officiel CAPEF (image pleine largeur). */}
      <div className="flex h-24 w-full items-center justify-center border border-dashed border-accent text-center text-xs text-muted-foreground">
        Zone réservée à l'en-tête officiel CAPEF (image bilingue pleine largeur)
      </div>

      <div className="mt-4 text-center">
        <h1 className="font-serif text-xl font-bold tracking-wide text-primary uppercase">
          Plan de Trésorerie
        </h1>
        <p className="mt-1 text-xs">
          {institution} — Exercice : {exercice} · Période : {periode} · Unité monétaire :{" "}
          {uniteMonetaire}
        </p>
      </div>

      <div className="mt-5 space-y-5">
        <TableauLecture
          titre="I — Encaissements prévisionnels"
          intituleColonne="Nature des recettes"
          postes={POSTES_ENCAISSEMENTS}
          grille={encaissements}
          libelleTotal="Total encaissements mensuels"
        />
        <TableauLecture
          titre="II — Décaissements prévisionnels"
          intituleColonne="Nature des dépenses"
          postes={POSTES_DECAISSEMENTS}
          grille={decaissements}
          libelleTotal="Total décaissements mensuels"
        />
        <section className="bloc-impression">
          <h3 className="mb-1 font-serif text-sm font-bold text-primary uppercase">
            III — Situation de trésorerie
          </h3>
          <TableauSituation situation={situation} compact />
        </section>
      </div>
    </div>
  );
}
