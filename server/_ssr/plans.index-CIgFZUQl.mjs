import { r as __toESM } from "../_runtime.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { n as Input, r as Label, t as Button } from "./label-kmkOj77v.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { c as supprimerPlan, i as dupliquerPlan, l as useServerFn, o as listerPlans, r as creerPlan, s as renommerPlan, t as EnTeteApplication } from "./EnTeteApplication-oTtFToR8.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plans.index-CIgFZUQl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageListePlans() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const lister = useServerFn(listerPlans);
	const creer = useServerFn(creerPlan);
	const dupliquer = useServerFn(dupliquerPlan);
	const supprimer = useServerFn(supprimerPlan);
	const renommer = useServerFn(renommerPlan);
	const anneeCourante = (/* @__PURE__ */ new Date()).getFullYear();
	const [nouvelExercice, setNouvelExercice] = (0, import_react.useState)(String(anneeCourante));
	const [nouveauNom, setNouveauNom] = (0, import_react.useState)("");
	const [idEnEdition, setIdEnEdition] = (0, import_react.useState)(null);
	const [nomEnEdition, setNomEnEdition] = (0, import_react.useState)("");
	const { data: plans, isLoading } = useQuery({
		queryKey: ["plans"],
		queryFn: () => lister()
	});
	const creation = useMutation({
		mutationFn: (variables) => creer({ data: variables }),
		onSuccess: (plan) => {
			queryClient.invalidateQueries({ queryKey: ["plans"] });
			if (plan) navigate({
				to: "/plans/$id",
				params: { id: plan.id }
			});
		},
		onError: () => toast.error("Création impossible. Veuillez réessayer.")
	});
	const duplication = useMutation({
		mutationFn: (variables) => dupliquer({ data: variables }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["plans"] });
			toast.success("Plan dupliqué.");
		},
		onError: () => toast.error("Duplication impossible.")
	});
	const renommage = useMutation({
		mutationFn: (variables) => renommer({ data: variables }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["plans"] });
			setIdEnEdition(null);
			toast.success("Plan renommé.");
		},
		onError: () => toast.error("Renommage impossible.")
	});
	const suppression = useMutation({
		mutationFn: (id) => supprimer({ data: { id } }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["plans"] });
			toast.success("Plan supprimé.");
		},
		onError: () => toast.error("Suppression impossible.")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnTeteApplication, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-[1400px] px-6 py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-3xl font-bold text-primary",
					children: "Mes plans de trésorerie"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted-foreground",
					children: "Chaque exercice correspond à un plan annuel de douze mois, en FCFA. Ouvrez un brouillon pour le compléter ou créez un nouvel exercice."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap items-end gap-3 border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "exercice",
								children: "Exercice du nouveau plan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "exercice",
								type: "number",
								min: 2e3,
								max: 2100,
								value: nouvelExercice,
								onChange: (e) => setNouvelExercice(e.target.value),
								className: "w-40"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "nom",
								children: "Nom du plan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "nom",
								value: nouveauNom,
								onChange: (e) => setNouveauNom(e.target.value),
								placeholder: `Plan ${nouvelExercice}`,
								className: "w-72"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => creation.mutate(nouveauNom.trim() ? {
								exercice: Number(nouvelExercice),
								nom: nouveauNom.trim()
							} : { exercice: Number(nouvelExercice) }),
							disabled: creation.isPending,
							children: "Nouveau plan"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 border border-border bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full border-collapse text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border bg-secondary text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-semibold text-primary",
									children: "Nom du plan"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-semibold text-primary",
									children: "Exercice"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-semibold text-primary",
									children: "Période"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-semibold text-primary",
									children: "Statut"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-semibold text-primary",
									children: "Dernière modification"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-right font-semibold text-primary",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
							isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 6,
								className: "px-4 py-6 text-muted-foreground",
								children: "Chargement…"
							}) }),
							!isLoading && (plans?.length ?? 0) === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 6,
								className: "px-4 py-6 text-muted-foreground",
								children: "Aucun plan enregistré pour le moment."
							}) }),
							plans?.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border last:border-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 font-medium",
										children: idEnEdition === plan.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													autoFocus: true,
													value: nomEnEdition,
													onChange: (e) => setNomEnEdition(e.target.value),
													onKeyDown: (e) => {
														if (e.key === "Enter" && nomEnEdition.trim()) renommage.mutate({
															id: plan.id,
															nom: nomEnEdition.trim()
														});
														if (e.key === "Escape") setIdEnEdition(null);
													},
													className: "h-9 w-56"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													disabled: renommage.isPending || !nomEnEdition.trim(),
													onClick: () => renommage.mutate({
														id: plan.id,
														nom: nomEnEdition.trim()
													}),
													children: "Valider"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													variant: "ghost",
													onClick: () => setIdEnEdition(null),
													children: "Annuler"
												})
											]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "text-left underline decoration-dotted underline-offset-4 hover:text-accent",
											title: "Cliquer pour renommer",
											onClick: () => {
												setIdEnEdition(plan.id);
												setNomEnEdition(plan.nom ?? "");
											},
											children: plan.nom || `Plan ${plan.exercice}`
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: plan.exercice
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: plan.periode
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: plan.statut === "finalise" ? "border border-primary px-2 py-0.5 text-xs font-medium text-primary" : "border border-accent px-2 py-0.5 text-xs font-medium text-accent",
											children: plan.statut === "finalise" ? "Finalisé" : "Brouillon"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-muted-foreground",
										children: new Date(plan.updated_at).toLocaleDateString("fr-FR", {
											day: "2-digit",
											month: "long",
											year: "numeric"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap justify-end gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													onClick: () => navigate({
														to: "/plans/$id",
														params: { id: plan.id }
													}),
													children: "Ouvrir"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													variant: "outline",
													onClick: () => {
														setIdEnEdition(plan.id);
														setNomEnEdition(plan.nom ?? "");
													},
													children: "Renommer"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													variant: "outline",
													disabled: duplication.isPending,
													onClick: () => duplication.mutate({
														id: plan.id,
														exercice: plan.exercice + 1
													}),
													children: ["Dupliquer en ", plan.exercice + 1]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													variant: "ghost",
													disabled: suppression.isPending,
													onClick: () => {
														if (window.confirm(`Supprimer le plan ${plan.exercice} ?`)) suppression.mutate(plan.id);
													},
													children: "Supprimer"
												})
											]
										})
									})
								]
							}, plan.id))
						] })]
					})
				})
			]
		})]
	});
}
//#endregion
export { PageListePlans as component };
