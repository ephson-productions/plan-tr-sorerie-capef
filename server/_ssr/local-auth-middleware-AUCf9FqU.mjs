import { t as createMiddleware } from "./createMiddleware-B_4t7rW1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/local-auth-middleware-AUCf9FqU.js
var requireLocalAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
	const { obtenirGestionnaireSession } = await import("./local-session.server-Cyg-qsg5.mjs");
	const session = await obtenirGestionnaireSession();
	if (!session.data.userId) throw new Error("Unauthorized: not logged in");
	return next({ context: {
		userId: session.data.userId,
		username: session.data.username
	} });
});
//#endregion
export { requireLocalAuth as t };
