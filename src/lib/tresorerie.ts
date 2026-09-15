export const MOIS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
] as const;

export const POSTES_ENCAISSEMENTS = [
  "Subvention de l'État (MINFI, MINADER et MINFOF)",
  "Centimes Additionnels Consulaires",
  "Redevance Cacao et Café",
  "Taxe d'Inspection Sanitaire et Vétérinaire",
  "Produits de location d'Immeubles",
  "Produits de location de la salle",
  "Dons et legs",
  "Autres recettes",
] as const;

export const POSTES_DECAISSEMENTS = [
  "Salaires et traitements",
  "Indemnités et primes",
  "Charges sociales",
  "Achats de fournitures",
  "Eau, électricité, téléphone",
  "Loyers et charges locatives",
  "Entretien et maintenance",
  "Missions et déplacements",
  "Communication",
  "Prestations de services",
  "Impôts, taxes et droits",
  "Remboursement de dettes",
  "Investissements",
  "Subventions aux Unités Opérationnelles",
  "Autres dépenses",
] as const;

export type Grille = number[][];

export function grilleVide(lignes: number): Grille {
  return Array.from({ length: lignes }, () => Array.from({ length: 12 }, () => 0));
}

export function normaliserGrille(valeur: unknown, lignes: number): Grille {
  const base = grilleVide(lignes);
  if (!Array.isArray(valeur)) return base;
  valeur.forEach((ligne, i) => {
    if (i >= lignes || !Array.isArray(ligne)) return;
    ligne.forEach((cellule, j) => {
      if (j >= 12) return;
      const n = Number(cellule);
      base[i]![j] = Number.isFinite(n) ? n : 0;
    });
  });
  return base;
}

export function totalLigne(ligne: number[]): number {
  return ligne.reduce((s, v) => s + (Number.isFinite(v) ? v : 0), 0);
}

export function totauxMensuels(grille: Grille): number[] {
  return Array.from({ length: 12 }, (_, mois) =>
    grille.reduce((s, ligne) => s + (Number(ligne[mois]) || 0), 0),
  );
}

export function totalGeneral(grille: Grille): number {
  return totauxMensuels(grille).reduce((s, v) => s + v, 0);
}

export type SituationTresorerie = {
  soldeInitial: number[];
  encaissements: number[];
  disponibilites: number[];
  decaissements: number[];
  soldeMensuel: number[];
  soldeCumule: number[];
};

export function calculerSituation(
  encaissements: Grille,
  decaissements: Grille,
  soldeInitialJanvier: number,
): SituationTresorerie {
  const enc = totauxMensuels(encaissements);
  const dec = totauxMensuels(decaissements);
  const soldeInitial: number[] = [];
  const disponibilites: number[] = [];
  const soldeMensuel: number[] = [];
  const soldeCumule: number[] = [];

  for (let m = 0; m < 12; m++) {
    const initial = m === 0 ? soldeInitialJanvier : soldeCumule[m - 1]!;
    const dispo = initial + enc[m]!;
    const mensuel = enc[m]! - dec[m]!;
    const cumule = dispo - dec[m]!;
    soldeInitial.push(initial);
    disponibilites.push(dispo);
    soldeMensuel.push(mensuel);
    soldeCumule.push(cumule);
  }

  return { soldeInitial, encaissements: enc, disponibilites, decaissements: dec, soldeMensuel, soldeCumule };
}

export function formaterMontant(valeur: number): string {
  if (!Number.isFinite(valeur)) return "0";
  const arrondi = Math.round(valeur);
  const signe = arrondi < 0 ? "-" : "";
  const chiffres = Math.abs(arrondi)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u202F");
  return `${signe}${chiffres}`;
}
