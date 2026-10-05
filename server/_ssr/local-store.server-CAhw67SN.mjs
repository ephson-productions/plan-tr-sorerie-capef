import { r as __toESM } from "../_runtime.mjs";
import { t as require_bcryptjs } from "../_libs/bcryptjs.mjs";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
//#region node_modules/.nitro/vite/services/ssr/assets/local-store.server-CAhw67SN.js
var import_bcryptjs = /* @__PURE__ */ __toESM(require_bcryptjs());
var DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
var DB_PATH = path.join(DATA_DIR, "db.json");
function ensureDataDir() {
	if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}
function seedInitialDB() {
	const adminUser = process.env.ADMIN_USER || "admin";
	const adminPass = process.env.ADMIN_PASSWORD || "capef2026";
	const db = {
		users: [{
			id: crypto.randomUUID(),
			username: adminUser,
			passwordHash: import_bcryptjs.default.hashSync(adminPass, 10),
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		}],
		plans: []
	};
	console.log("========================================================");
	console.log(" Compte administrateur créé au premier démarrage :");
	console.log("   Utilisateur :", adminUser);
	console.log("   Mot de passe :", adminPass);
	console.log(" >>> Changez ce mot de passe dès la première connexion.");
	console.log("========================================================");
	return db;
}
function loadDB() {
	ensureDataDir();
	if (!fs.existsSync(DB_PATH)) {
		const db = seedInitialDB();
		fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
		return db;
	}
	return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}
function saveDB(db) {
	ensureDataDir();
	fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}
function verifierIdentifiants(username, password) {
	const user = loadDB().users.find((u) => u.username === username);
	if (!user) return null;
	if (!import_bcryptjs.default.compareSync(password || "", user.passwordHash)) return null;
	return {
		id: user.id,
		username: user.username
	};
}
function changerMotDePasseUtilisateur(userId, ancienMotDePasse, nouveauMotDePasse) {
	const db = loadDB();
	const user = db.users.find((u) => u.id === userId);
	if (!user) return {
		ok: false,
		error: "Utilisateur introuvable"
	};
	if (!import_bcryptjs.default.compareSync(ancienMotDePasse || "", user.passwordHash)) return {
		ok: false,
		error: "Mot de passe actuel incorrect"
	};
	if (!nouveauMotDePasse || nouveauMotDePasse.length < 6) return {
		ok: false,
		error: "Le nouveau mot de passe doit contenir au moins 6 caractères"
	};
	user.passwordHash = import_bcryptjs.default.hashSync(nouveauMotDePasse, 10);
	saveDB(db);
	return { ok: true };
}
function toResume(p) {
	return {
		id: p.id,
		nom: p.nom,
		exercice: p.exercice,
		periode: p.periode,
		statut: p.statut,
		updated_at: p.updated_at,
		unite_monetaire: p.unite_monetaire
	};
}
function listerPlansUtilisateur(userId) {
	return loadDB().plans.filter((p) => p.user_id === userId).sort((a, b) => b.exercice - a.exercice).map(toResume);
}
function chargerPlanUtilisateur(userId, id) {
	return loadDB().plans.find((p) => p.id === id && p.user_id === userId) ?? null;
}
function creerPlanUtilisateur(userId, input) {
	const db = loadDB();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const plan = {
		id: crypto.randomUUID(),
		user_id: userId,
		nom: input.nom ?? `Plan ${input.exercice}`,
		exercice: input.exercice,
		periode: "Janvier-Décembre",
		unite_monetaire: "FCFA",
		institution: "CAPEF",
		solde_initial: 0,
		statut: "brouillon",
		encaissements: input.grilleVideEnc,
		decaissements: input.grilleVideDec,
		created_at: now,
		updated_at: now
	};
	db.plans.push(plan);
	saveDB(db);
	return plan;
}
function enregistrerPlanUtilisateur(userId, id, champs) {
	const db = loadDB();
	const plan = db.plans.find((p) => p.id === id && p.user_id === userId);
	if (!plan) return null;
	Object.assign(plan, champs);
	plan.updated_at = (/* @__PURE__ */ new Date()).toISOString();
	saveDB(db);
	return plan;
}
function dupliquerPlanUtilisateur(userId, id, nouvelExercice) {
	const db = loadDB();
	const source = db.plans.find((p) => p.id === id && p.user_id === userId);
	if (!source) return null;
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const plan = {
		...source,
		id: crypto.randomUUID(),
		nom: `${source.nom} (copie ${nouvelExercice})`,
		exercice: nouvelExercice,
		statut: "brouillon",
		created_at: now,
		updated_at: now
	};
	db.plans.push(plan);
	saveDB(db);
	return plan;
}
function supprimerPlanUtilisateur(userId, id) {
	const db = loadDB();
	const idx = db.plans.findIndex((p) => p.id === id && p.user_id === userId);
	if (idx === -1) return false;
	db.plans.splice(idx, 1);
	saveDB(db);
	return true;
}
function renommerPlanUtilisateur(userId, id, nom) {
	const db = loadDB();
	const plan = db.plans.find((p) => p.id === id && p.user_id === userId);
	if (!plan) return null;
	plan.nom = nom;
	plan.updated_at = (/* @__PURE__ */ new Date()).toISOString();
	saveDB(db);
	return plan;
}
//#endregion
export { changerMotDePasseUtilisateur, chargerPlanUtilisateur, creerPlanUtilisateur, dupliquerPlanUtilisateur, enregistrerPlanUtilisateur, listerPlansUtilisateur, renommerPlanUtilisateur, supprimerPlanUtilisateur, verifierIdentifiants };
