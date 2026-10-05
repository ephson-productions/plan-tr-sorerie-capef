//#region node_modules/.nitro/vite/services/ssr/assets/tresorerie-BivpdLED.js
var MOIS = [
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
	"Décembre"
];
var POSTES_ENCAISSEMENTS = [
	"Subvention de l'État (MINFI, MINADER et MINFOF)",
	"Centimes Additionnels Consulaires",
	"Redevance Cacao et Café",
	"Taxe d'Inspection Sanitaire et Vétérinaire",
	"Produits de location d'Immeubles",
	"Produits de location de la salle",
	"Dons et legs",
	"Autres recettes"
];
var POSTES_DECAISSEMENTS = [
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
	"Autres dépenses"
];
function grilleVide(lignes) {
	return Array.from({ length: lignes }, () => Array.from({ length: 12 }, () => 0));
}
function normaliserGrille(valeur, lignes) {
	const base = grilleVide(lignes);
	if (!Array.isArray(valeur)) return base;
	valeur.forEach((ligne, i) => {
		if (i >= lignes || !Array.isArray(ligne)) return;
		ligne.forEach((cellule, j) => {
			if (j >= 12) return;
			const n = Number(cellule);
			base[i][j] = Number.isFinite(n) ? n : 0;
		});
	});
	return base;
}
function totalLigne(ligne) {
	return ligne.reduce((s, v) => s + (Number.isFinite(v) ? v : 0), 0);
}
function totauxMensuels(grille) {
	return Array.from({ length: 12 }, (_, mois) => grille.reduce((s, ligne) => s + (Number(ligne[mois]) || 0), 0));
}
function totalGeneral(grille) {
	return totauxMensuels(grille).reduce((s, v) => s + v, 0);
}
function calculerSituation(encaissements, decaissements, soldeInitialJanvier) {
	const enc = totauxMensuels(encaissements);
	const dec = totauxMensuels(decaissements);
	const soldeInitial = [];
	const disponibilites = [];
	const soldeMensuel = [];
	const soldeCumule = [];
	for (let m = 0; m < 12; m++) {
		const initial = m === 0 ? soldeInitialJanvier : soldeCumule[m - 1];
		const dispo = initial + enc[m];
		const mensuel = enc[m] - dec[m];
		const cumule = dispo - dec[m];
		soldeInitial.push(initial);
		disponibilites.push(dispo);
		soldeMensuel.push(mensuel);
		soldeCumule.push(cumule);
	}
	return {
		soldeInitial,
		encaissements: enc,
		disponibilites,
		decaissements: dec,
		soldeMensuel,
		soldeCumule
	};
}
function formaterMontant(valeur) {
	if (!Number.isFinite(valeur)) return "0";
	const arrondi = Math.round(valeur);
	return `${arrondi < 0 ? "-" : ""}${Math.abs(arrondi).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
}
//#endregion
export { formaterMontant as a, totalGeneral as c, calculerSituation as i, totalLigne as l, POSTES_DECAISSEMENTS as n, grilleVide as o, POSTES_ENCAISSEMENTS as r, normaliserGrille as s, MOIS as t, totauxMensuels as u };
