import { r as __toESM } from "../_runtime.mjs";
import { D as isRedirect, _ as useRouter, g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireLocalAuth } from "./local-auth-middleware-AUCf9FqU.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
import { a as seDeconnecter, n as createSsrRpc } from "./auth.functions-ODiRTETM.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as Button } from "./label-kmkOj77v.mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/EnTeteApplication-oTtFToR8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
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
var listerPlans = createServerFn({ method: "GET" }).middleware([requireLocalAuth]).handler(createSsrRpc("0f5ec2a98b627b4f09b0016b31816ec4d3cbf3449389b875bab5548a085abbad"));
var chargerPlan = createServerFn({ method: "GET" }).middleware([requireLocalAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(createSsrRpc("a1966d1687953ecc18a9fa33b946bebfc2bd49322c8c7f79b56fb8d6de9296c7"));
var creerPlan = createServerFn({ method: "POST" }).middleware([requireLocalAuth]).inputValidator((input) => objectType({
	exercice: numberType().int().min(2e3).max(2100),
	nom: stringType().trim().min(1).max(160).optional()
}).parse(input)).handler(createSsrRpc("10da3080363452aa3a2ba237dde0d41fe1383fe662eda1b02081165f02ea49a6"));
var enregistrerPlan = createServerFn({ method: "POST" }).middleware([requireLocalAuth]).inputValidator((input) => planSchema.parse(input)).handler(createSsrRpc("5df10279c9c3d277425f8f5ef319c87cd21f4d453f001adad3de011f959d1a7a"));
var dupliquerPlan = createServerFn({ method: "POST" }).middleware([requireLocalAuth]).inputValidator((input) => objectType({
	id: stringType().uuid(),
	exercice: numberType().int().min(2e3).max(2100)
}).parse(input)).handler(createSsrRpc("e16cf9e2aa904f7aa729131ee315cdf964938c4d4d59d53dd785beaf0377e3db"));
var supprimerPlan = createServerFn({ method: "POST" }).middleware([requireLocalAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(createSsrRpc("522d87c771cf690cde7ba505009894b47caceda91302ed6f5f69f64801da5f71"));
var renommerPlan = createServerFn({ method: "POST" }).middleware([requireLocalAuth]).inputValidator((input) => objectType({
	id: stringType().uuid(),
	nom: stringType().trim().min(1).max(160)
}).parse(input)).handler(createSsrRpc("fc753555a3bf639cd30b83d42079938150e8e31c6c130dad0223025ad1a35538"));
function EnTeteApplication() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	async function seDeconnecterHandler() {
		await queryClient.cancelQueries();
		queryClient.clear();
		await seDeconnecter();
		navigate({
			to: "/",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sans-impression border-b border-border bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-6 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] font-medium tracking-[0.2em] text-accent uppercase",
				children: "CAPEF"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/plans",
				className: "font-serif text-lg font-bold text-primary",
				children: "Plan de Trésorerie"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/reset-password",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						children: "Changer le mot de passe"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "sm",
					onClick: seDeconnecterHandler,
					children: "Se déconnecter"
				})]
			})]
		})
	});
}
//#endregion
export { enregistrerPlan as a, supprimerPlan as c, dupliquerPlan as i, useServerFn as l, chargerPlan as n, listerPlans as o, creerPlan as r, renommerPlan as s, EnTeteApplication as t };
