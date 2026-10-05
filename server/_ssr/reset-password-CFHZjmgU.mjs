import { r as __toESM } from "../_runtime.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as obtenirUtilisateurCourant, t as changerMotDePasse } from "./auth.functions-ODiRTETM.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { n as Input, r as Label, t as Button } from "./label-kmkOj77v.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-CFHZjmgU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageChangerMotDePasse() {
	const navigate = useNavigate();
	const [ancien, setAncien] = (0, import_react.useState)("");
	const [nouveau, setNouveau] = (0, import_react.useState)("");
	const [confirmation, setConfirmation] = (0, import_react.useState)("");
	const [enCours, setEnCours] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		obtenirUtilisateurCourant().then((user) => {
			if (!user) navigate({
				to: "/",
				replace: true
			});
		});
	}, [navigate]);
	async function valider(e) {
		e.preventDefault();
		if (nouveau.length < 6) {
			toast.error("Le nouveau mot de passe doit compter au moins 6 caractères.");
			return;
		}
		if (nouveau !== confirmation) {
			toast.error("Les deux mots de passe ne correspondent pas.");
			return;
		}
		setEnCours(true);
		try {
			await changerMotDePasse({ data: {
				oldPassword: ancien,
				newPassword: nouveau
			} });
			toast.success("Mot de passe mis à jour.");
			navigate({
				to: "/plans",
				replace: true
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Modification impossible.");
		} finally {
			setEnCours(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-screen items-center justify-center bg-background px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md border border-border bg-card p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-2xl font-bold text-primary",
					children: "Changer le mot de passe"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Saisissez votre mot de passe actuel puis le nouveau mot de passe."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: valider,
					className: "mt-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "ancien",
								children: "Mot de passe actuel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "ancien",
								type: "password",
								autoComplete: "current-password",
								value: ancien,
								onChange: (e) => setAncien(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "nouveau",
								children: "Nouveau mot de passe"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "nouveau",
								type: "password",
								autoComplete: "new-password",
								value: nouveau,
								onChange: (e) => setNouveau(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "confirmation",
								children: "Confirmation"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "confirmation",
								type: "password",
								autoComplete: "new-password",
								value: confirmation,
								onChange: (e) => setConfirmation(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full",
							disabled: enCours,
							children: enCours ? "Enregistrement…" : "Enregistrer le mot de passe"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { PageChangerMotDePasse as component };
