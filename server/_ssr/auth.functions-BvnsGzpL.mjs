import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { t as requireLocalAuth } from "./local-auth-middleware-AUCf9FqU.mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.functions-BvnsGzpL.js
var seConnecter_createServerFn_handler = createServerRpc({
	id: "002e2390f51882eb63cb7016bf389ebcb69e1c85843c3ad98d623fd8eb7cb02d",
	name: "seConnecter",
	filename: "src/lib/auth.functions.ts"
}, (opts) => seConnecter.__executeServer(opts));
var seConnecter = createServerFn({ method: "POST" }).inputValidator((input) => objectType({
	username: stringType().min(1),
	password: stringType().min(1)
}).parse(input)).handler(seConnecter_createServerFn_handler, async ({ data }) => {
	const { verifierIdentifiants } = await import("./local-store.server-CAhw67SN.mjs");
	const { obtenirGestionnaireSession } = await import("./local-session.server-Cyg-qsg5.mjs");
	const user = verifierIdentifiants(data.username, data.password);
	if (!user) throw new Error("Identifiants incorrects");
	await (await obtenirGestionnaireSession()).update({
		userId: user.id,
		username: user.username
	});
	return { username: user.username };
});
var seDeconnecter_createServerFn_handler = createServerRpc({
	id: "b53ce048307942d5034af13614dfc69b16ad44e0a2800a2d9b545c9fd51836b0",
	name: "seDeconnecter",
	filename: "src/lib/auth.functions.ts"
}, (opts) => seDeconnecter.__executeServer(opts));
var seDeconnecter = createServerFn({ method: "POST" }).handler(seDeconnecter_createServerFn_handler, async () => {
	const { obtenirGestionnaireSession } = await import("./local-session.server-Cyg-qsg5.mjs");
	await (await obtenirGestionnaireSession()).clear();
	return { ok: true };
});
var obtenirUtilisateurCourant_createServerFn_handler = createServerRpc({
	id: "df4c6029e735ca917027b1ce8a8b9b3411515e5dc6073ed56596d0d2b046b7a5",
	name: "obtenirUtilisateurCourant",
	filename: "src/lib/auth.functions.ts"
}, (opts) => obtenirUtilisateurCourant.__executeServer(opts));
var obtenirUtilisateurCourant = createServerFn({ method: "GET" }).handler(obtenirUtilisateurCourant_createServerFn_handler, async () => {
	const { obtenirGestionnaireSession } = await import("./local-session.server-Cyg-qsg5.mjs");
	const session = await obtenirGestionnaireSession();
	if (!session.data.userId) return null;
	return {
		id: session.data.userId,
		username: session.data.username
	};
});
var changerMotDePasse_createServerFn_handler = createServerRpc({
	id: "ce2b57534ce940342f6f60f458bfe655b1194643d49baa315d803abf925ae2af",
	name: "changerMotDePasse",
	filename: "src/lib/auth.functions.ts"
}, (opts) => changerMotDePasse.__executeServer(opts));
var changerMotDePasse = createServerFn({ method: "POST" }).middleware([requireLocalAuth]).inputValidator((input) => objectType({
	oldPassword: stringType().min(1),
	newPassword: stringType().min(6)
}).parse(input)).handler(changerMotDePasse_createServerFn_handler, async ({ data, context }) => {
	const { changerMotDePasseUtilisateur } = await import("./local-store.server-CAhw67SN.mjs");
	const result = changerMotDePasseUtilisateur(context.userId, data.oldPassword, data.newPassword);
	if (!result.ok) throw new Error(result.error);
	return { ok: true };
});
//#endregion
export { changerMotDePasse_createServerFn_handler, obtenirUtilisateurCourant_createServerFn_handler, seConnecter_createServerFn_handler, seDeconnecter_createServerFn_handler };
