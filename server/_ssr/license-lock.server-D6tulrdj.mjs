import { r as __toESM } from "../_runtime.mjs";
import { t as require_bcryptjs } from "../_libs/bcryptjs.mjs";
import fs from "node:fs";
import path from "node:path";
//#region node_modules/.nitro/vite/services/ssr/assets/license-lock.server-D6tulrdj.js
var import_bcryptjs = /* @__PURE__ */ __toESM(require_bcryptjs());
var DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
var LOCK_PATH = path.join(DATA_DIR, "activation.json");
var TRIAL_DAYS = Number(process.env.TRIAL_DAYS || 7);
function ensureDataDir() {
	if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}
function nouvelleEcheance() {
	return new Date(Date.now() + TRIAL_DAYS * 24 * 60 * 60 * 1e3).toISOString();
}
function chargerActivation() {
	ensureDataDir();
	if (!fs.existsSync(LOCK_PATH)) {
		const unlockPassword = process.env.UNLOCK_PASSWORD;
		if (!unlockPassword) {
			const activation = {
				unlockPasswordHash: "",
				unlockedUntil: (/* @__PURE__ */ new Date(864e13)).toISOString()
			};
			fs.writeFileSync(LOCK_PATH, JSON.stringify(activation, null, 2));
			return activation;
		}
		const activation = {
			unlockPasswordHash: import_bcryptjs.default.hashSync(unlockPassword, 10),
			unlockedUntil: nouvelleEcheance()
		};
		fs.writeFileSync(LOCK_PATH, JSON.stringify(activation, null, 2));
		return activation;
	}
	return JSON.parse(fs.readFileSync(LOCK_PATH, "utf8"));
}
function sauvegarderActivation(a) {
	ensureDataDir();
	fs.writeFileSync(LOCK_PATH, JSON.stringify(a, null, 2));
}
function estVerrouille() {
	const a = chargerActivation();
	if (!a.unlockPasswordHash) return false;
	return new Date(a.unlockedUntil).getTime() < Date.now();
}
function tenterDeverrouillage(password) {
	const a = chargerActivation();
	if (!a.unlockPasswordHash) return true;
	if (!import_bcryptjs.default.compareSync(password || "", a.unlockPasswordHash)) return false;
	a.unlockedUntil = nouvelleEcheance();
	sauvegarderActivation(a);
	return true;
}
//#endregion
export { estVerrouille, tenterDeverrouillage };
