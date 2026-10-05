import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireLocalAuth } from "./local-auth-middleware-AUCf9FqU.mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-C9zBWed9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.functions-ODiRTETM.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var seConnecter = createServerFn({ method: "POST" }).inputValidator((input) => objectType({
	username: stringType().min(1),
	password: stringType().min(1)
}).parse(input)).handler(createSsrRpc("002e2390f51882eb63cb7016bf389ebcb69e1c85843c3ad98d623fd8eb7cb02d"));
var seDeconnecter = createServerFn({ method: "POST" }).handler(createSsrRpc("b53ce048307942d5034af13614dfc69b16ad44e0a2800a2d9b545c9fd51836b0"));
var obtenirUtilisateurCourant = createServerFn({ method: "GET" }).handler(createSsrRpc("df4c6029e735ca917027b1ce8a8b9b3411515e5dc6073ed56596d0d2b046b7a5"));
var changerMotDePasse = createServerFn({ method: "POST" }).middleware([requireLocalAuth]).inputValidator((input) => objectType({
	oldPassword: stringType().min(1),
	newPassword: stringType().min(6)
}).parse(input)).handler(createSsrRpc("ce2b57534ce940342f6f60f458bfe655b1194643d49baa315d803abf925ae2af"));
//#endregion
export { seDeconnecter as a, seConnecter as i, createSsrRpc as n, obtenirUtilisateurCourant as r, changerMotDePasse as t };
