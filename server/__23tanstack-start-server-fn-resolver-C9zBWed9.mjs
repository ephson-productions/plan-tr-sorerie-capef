//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-C9zBWed9.js
var manifest = {
	"002e2390f51882eb63cb7016bf389ebcb69e1c85843c3ad98d623fd8eb7cb02d": {
		functionName: "seConnecter_createServerFn_handler",
		importer: () => import("./_ssr/auth.functions-BvnsGzpL.mjs")
	},
	"0f5ec2a98b627b4f09b0016b31816ec4d3cbf3449389b875bab5548a085abbad": {
		functionName: "listerPlans_createServerFn_handler",
		importer: () => import("./_ssr/plans.functions-DCuZDqQK.mjs")
	},
	"10da3080363452aa3a2ba237dde0d41fe1383fe662eda1b02081165f02ea49a6": {
		functionName: "creerPlan_createServerFn_handler",
		importer: () => import("./_ssr/plans.functions-DCuZDqQK.mjs")
	},
	"522d87c771cf690cde7ba505009894b47caceda91302ed6f5f69f64801da5f71": {
		functionName: "supprimerPlan_createServerFn_handler",
		importer: () => import("./_ssr/plans.functions-DCuZDqQK.mjs")
	},
	"5df10279c9c3d277425f8f5ef319c87cd21f4d453f001adad3de011f959d1a7a": {
		functionName: "enregistrerPlan_createServerFn_handler",
		importer: () => import("./_ssr/plans.functions-DCuZDqQK.mjs")
	},
	"a1966d1687953ecc18a9fa33b946bebfc2bd49322c8c7f79b56fb8d6de9296c7": {
		functionName: "chargerPlan_createServerFn_handler",
		importer: () => import("./_ssr/plans.functions-DCuZDqQK.mjs")
	},
	"b53ce048307942d5034af13614dfc69b16ad44e0a2800a2d9b545c9fd51836b0": {
		functionName: "seDeconnecter_createServerFn_handler",
		importer: () => import("./_ssr/auth.functions-BvnsGzpL.mjs")
	},
	"ce2b57534ce940342f6f60f458bfe655b1194643d49baa315d803abf925ae2af": {
		functionName: "changerMotDePasse_createServerFn_handler",
		importer: () => import("./_ssr/auth.functions-BvnsGzpL.mjs")
	},
	"df4c6029e735ca917027b1ce8a8b9b3411515e5dc6073ed56596d0d2b046b7a5": {
		functionName: "obtenirUtilisateurCourant_createServerFn_handler",
		importer: () => import("./_ssr/auth.functions-BvnsGzpL.mjs")
	},
	"e16cf9e2aa904f7aa729131ee315cdf964938c4d4d59d53dd785beaf0377e3db": {
		functionName: "dupliquerPlan_createServerFn_handler",
		importer: () => import("./_ssr/plans.functions-DCuZDqQK.mjs")
	},
	"fc753555a3bf639cd30b83d42079938150e8e31c6c130dad0223025ad1a35538": {
		functionName: "renommerPlan_createServerFn_handler",
		importer: () => import("./_ssr/plans.functions-DCuZDqQK.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
