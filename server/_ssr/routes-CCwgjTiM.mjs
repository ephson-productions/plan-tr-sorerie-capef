import { r as __toESM } from "../_runtime.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as seConnecter, r as obtenirUtilisateurCourant } from "./auth.functions-ODiRTETM.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { n as Input, r as Label, t as Button } from "./label-kmkOj77v.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CCwgjTiM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var logo_capef_default = "/assets/logo-capef-CiLxpaYq.png";
function PageConnexion() {
	const navigate = useNavigate();
	const [identifiant, setIdentifiant] = (0, import_react.useState)("");
	const [motDePasse, setMotDePasse] = (0, import_react.useState)("");
	const [enCours, setEnCours] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		obtenirUtilisateurCourant().then((user) => {
			if (user) navigate({
				to: "/plans",
				replace: true
			});
		});
	}, [navigate]);
	async function seConnecterHandler(e) {
		e.preventDefault();
		setEnCours(true);
		try {
			await seConnecter({ data: {
				username: identifiant,
				password: motDePasse
			} });
			navigate({
				to: "/plans",
				replace: true
			});
		} catch {
			toast.error("Connexion impossible : identifiants incorrects.");
		} finally {
			setEnCours(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-screen items-center justify-center bg-background px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md border border-border bg-card p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: logo_capef_default,
					alt: "Logo de la CAPEF",
					className: "mx-auto mb-5 h-32 w-auto object-contain"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-center font-serif text-2xl leading-tight font-bold text-primary",
					children: "Plan de Trésorerie\xA0"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-center text-sm text-muted-foreground",
					children: "Chambre d'Agriculture, des Pêches, de l'Élevage et des Forêts du Cameroun"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: seConnecterHandler,
					className: "mt-8 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "identifiant",
								children: "Identifiant"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "identifiant",
								type: "text",
								required: true,
								autoComplete: "username",
								value: identifiant,
								onChange: (e) => setIdentifiant(e.target.value),
								placeholder: "votre identifiant"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "motdepasse",
								children: "Mot de passe"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "motdepasse",
								type: "password",
								required: true,
								autoComplete: "current-password",
								value: motDePasse,
								onChange: (e) => setMotDePasse(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: enCours,
							className: "w-full",
							children: enCours ? "Veuillez patienter…" : "Se connecter"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground",
					children: [
						"Accès réservé. En cas de mot de passe oublié, contactez l'administrateur système (réinitialisation via la commande ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "scripts/reset-password.js" }),
						")."
					]
				})
			]
		})
	});
}
//#endregion
export { PageConnexion as component };
