import { r as useSession$1 } from "./request-response-Bv1MIUlU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/local-session.server-Cyg-qsg5.js
var SESSION_PASSWORD = process.env.SESSION_SECRET || "capef-plan-tresorerie-cle-de-session-par-defaut-a-changer";
function obtenirGestionnaireSession() {
	return useSession$1({
		password: SESSION_PASSWORD,
		name: "capef_session",
		maxAge: 43200
	});
}
//#endregion
export { obtenirGestionnaireSession };
