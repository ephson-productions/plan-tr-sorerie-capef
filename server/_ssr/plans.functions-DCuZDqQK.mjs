import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { t as requireLocalAuth } from "./local-auth-middleware-AUCf9FqU.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
import { n as POSTES_DECAISSEMENTS, o as grilleVide, r as POSTES_ENCAISSEMENTS } from "./tresorerie-BivpdLED.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plans.functions-DCuZDqQK.js
var grilleSchema = arrayType(arrayType(numberType()));
var planSchema = objectType({
	id: stringType().uuid(),
	nom: stringType().trim().min(1).max(160),
	exercice: numberType().int().min(2e3).max(2100),
	periode: stringType().min(1).max(120),
	unite_monetaire: stringType().min(1).max(20),
	institution: stringType().min(1).max(200),
	solde_initial: numberType(),
	statut: enumType(["brouillon", "finalise"]),
	encaissements: grilleSchema,
	decaissements: grilleSchema
});
var listerPlans_createServerFn_handler = createServerRpc({
	id: "0f5ec2a98b627b4f09b0016b31816ec4d3cbf3449389b875bab5548a085abbad",
	name: "listerPlans",
	filename: "src/lib/plans.functions.ts"
}, (opts) => listerPlans.__executeServer(opts));
var listerPlans = createServerFn({ method: "GET" }).middleware([requireLocalAuth]).handler(listerPlans_createServerFn_handler, async ({ context }) => {
	const { listerPlansUtilisateur } = await import("./local-store.server-CAhw67SN.mjs");
	return listerPlansUtilisateur(context.userId);
});
var chargerPlan_createServerFn_handler = createServerRpc({
	id: "a1966d1687953ecc18a9fa33b946bebfc2bd49322c8c7f79b56fb8d6de9296c7",
	name: "chargerPlan",
	filename: "src/lib/plans.functions.ts"
}, (opts) => chargerPlan.__executeServer(opts));
var chargerPlan = createServerFn({ method: "GET" }).middleware([requireLocalAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(chargerPlan_createServerFn_handler, async ({ data, context }) => {
	const { chargerPlanUtilisateur } = await import("./local-store.server-CAhw67SN.mjs");
	return chargerPlanUtilisateur(context.userId, data.id);
});
var creerPlan_createServerFn_handler = createServerRpc({
	id: "10da3080363452aa3a2ba237dde0d41fe1383fe662eda1b02081165f02ea49a6",
	name: "creerPlan",
	filename: "src/lib/plans.functions.ts"
}, (opts) => creerPlan.__executeServer(opts));
var creerPlan = createServerFn({ method: "POST" }).middleware([requireLocalAuth]).inputValidator((input) => objectType({
	exercice: numberType().int().min(2e3).max(2100),
	nom: stringType().trim().min(1).max(160).optional()
}).parse(input)).handler(creerPlan_createServerFn_handler, async ({ data, context }) => {
	const { creerPlanUtilisateur } = await import("./local-store.server-CAhw67SN.mjs");
	return creerPlanUtilisateur(context.userId, {
		exercice: data.exercice,
		nom: data.nom,
		grilleVideEnc: grilleVide(POSTES_ENCAISSEMENTS.length),
		grilleVideDec: grilleVide(POSTES_DECAISSEMENTS.length)
	});
});
var enregistrerPlan_createServerFn_handler = createServerRpc({
	id: "5df10279c9c3d277425f8f5ef319c87cd21f4d453f001adad3de011f959d1a7a",
	name: "enregistrerPlan",
	filename: "src/lib/plans.functions.ts"
}, (opts) => enregistrerPlan.__executeServer(opts));
var enregistrerPlan = createServerFn({ method: "POST" }).middleware([requireLocalAuth]).inputValidator((input) => planSchema.parse(input)).handler(enregistrerPlan_createServerFn_handler, async ({ data, context }) => {
	const { enregistrerPlanUtilisateur } = await import("./local-store.server-CAhw67SN.mjs");
	const { id, ...champs } = data;
	const plan = enregistrerPlanUtilisateur(context.userId, id, champs);
	if (!plan) throw new Error("Plan introuvable");
	return plan;
});
var dupliquerPlan_createServerFn_handler = createServerRpc({
	id: "e16cf9e2aa904f7aa729131ee315cdf964938c4d4d59d53dd785beaf0377e3db",
	name: "dupliquerPlan",
	filename: "src/lib/plans.functions.ts"
}, (opts) => dupliquerPlan.__executeServer(opts));
var dupliquerPlan = createServerFn({ method: "POST" }).middleware([requireLocalAuth]).inputValidator((input) => objectType({
	id: stringType().uuid(),
	exercice: numberType().int().min(2e3).max(2100)
}).parse(input)).handler(dupliquerPlan_createServerFn_handler, async ({ data, context }) => {
	const { dupliquerPlanUtilisateur } = await import("./local-store.server-CAhw67SN.mjs");
	const plan = dupliquerPlanUtilisateur(context.userId, data.id, data.exercice);
	if (!plan) throw new Error("Plan source introuvable");
	return plan;
});
var supprimerPlan_createServerFn_handler = createServerRpc({
	id: "522d87c771cf690cde7ba505009894b47caceda91302ed6f5f69f64801da5f71",
	name: "supprimerPlan",
	filename: "src/lib/plans.functions.ts"
}, (opts) => supprimerPlan.__executeServer(opts));
var supprimerPlan = createServerFn({ method: "POST" }).middleware([requireLocalAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(supprimerPlan_createServerFn_handler, async ({ data, context }) => {
	const { supprimerPlanUtilisateur } = await import("./local-store.server-CAhw67SN.mjs");
	if (!supprimerPlanUtilisateur(context.userId, data.id)) throw new Error("Plan introuvable");
	return { ok: true };
});
var renommerPlan_createServerFn_handler = createServerRpc({
	id: "fc753555a3bf639cd30b83d42079938150e8e31c6c130dad0223025ad1a35538",
	name: "renommerPlan",
	filename: "src/lib/plans.functions.ts"
}, (opts) => renommerPlan.__executeServer(opts));
var renommerPlan = createServerFn({ method: "POST" }).middleware([requireLocalAuth]).inputValidator((input) => objectType({
	id: stringType().uuid(),
	nom: stringType().trim().min(1).max(160)
}).parse(input)).handler(renommerPlan_createServerFn_handler, async ({ data, context }) => {
	const { renommerPlanUtilisateur } = await import("./local-store.server-CAhw67SN.mjs");
	const plan = renommerPlanUtilisateur(context.userId, data.id, data.nom);
	if (!plan) throw new Error("Plan introuvable");
	return plan;
});
//#endregion
export { chargerPlan_createServerFn_handler, creerPlan_createServerFn_handler, dupliquerPlan_createServerFn_handler, enregistrerPlan_createServerFn_handler, listerPlans_createServerFn_handler, renommerPlan_createServerFn_handler, supprimerPlan_createServerFn_handler };
