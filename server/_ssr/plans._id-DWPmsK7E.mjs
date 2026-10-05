import { r as __toESM } from "../_runtime.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { n as Input, r as Label, t as Button } from "./label-kmkOj77v.mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as enregistrerPlan, l as useServerFn, n as chargerPlan, t as EnTeteApplication } from "./EnTeteApplication-oTtFToR8.mjs";
import { a as formaterMontant, c as totalGeneral, i as calculerSituation, l as totalLigne, n as POSTES_DECAISSEMENTS, o as grilleVide, r as POSTES_ENCAISSEMENTS, s as normaliserGrille, t as MOIS, u as totauxMensuels } from "./tresorerie-BivpdLED.mjs";
import { t as Route } from "./plans._id-kv1hHpJh.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plans._id-DWPmsK7E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ETAPES = [
	"Informations générales",
	"Encaissements",
	"Décaissements",
	"Situation de trésorerie",
	"Aperçu et impression"
];
function BarreEtapes({ etape, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "sans-impression border-y border-border bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mx-auto flex max-w-[1400px] flex-wrap",
			children: ETAPES.map((libelle, index) => {
				const numero = index + 1;
				const active = numero === etape;
				const complete = numero < etape;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "flex-1 min-w-[180px] border-r border-border last:border-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onChange(numero),
						className: `flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${active ? "bg-primary text-primary-foreground" : complete ? "text-primary hover:bg-secondary" : "text-muted-foreground hover:bg-secondary"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-serif text-lg font-bold ${active ? "" : complete ? "text-accent" : ""}`,
							children: String(numero).padStart(2, "0")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm leading-tight",
							children: libelle
						})]
					})
				}, libelle);
			})
		})
	});
}
function GrilleSaisie({ titre, intituleColonne, postes, grille, onChange, uniteMonetaire }) {
	const totauxMois = totauxMensuels(grille);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-serif text-xl font-bold text-primary",
			children: titre
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: [
				"Montants en ",
				uniteMonetaire,
				".",
				"\xA0"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 overflow-x-auto border border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[1100px] border-collapse text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border bg-secondary",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-10 border-r border-border px-2 py-2 text-left font-semibold text-primary",
							children: "N°"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "min-w-[260px] border-r border-border px-3 py-2 text-left font-semibold text-primary",
							children: intituleColonne
						}),
						MOIS.map((mois) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "border-r border-border px-2 py-2 text-right font-semibold text-primary",
							children: mois
						}, mois)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-right font-semibold text-primary",
							children: "Total annuel"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [postes.map((poste, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border-r border-border px-2 py-1 text-muted-foreground",
							children: i + 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border-r border-border px-3 py-1",
							children: poste
						}),
						MOIS.map((mois, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border-r border-border p-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								inputMode: "numeric",
								step: "1",
								value: grille[i]?.[j] === 0 ? "" : grille[i]?.[j] ?? "",
								onChange: (e) => onChange(i, j, Number(e.target.value) || 0),
								placeholder: "0",
								"aria-label": `${poste} — ${mois}`,
								className: "w-24 bg-transparent px-2 py-1.5 text-right tabular-nums outline-none focus:bg-secondary"
							})
						}, mois)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-1 text-right font-medium tabular-nums",
							children: formaterMontant(totalLigne(grille[i] ?? []))
						})
					]
				}, poste)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "bg-secondary font-semibold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "border-r border-border px-2 py-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border-r border-border px-3 py-2 text-primary uppercase",
							children: "Total mensuel"
						}),
						totauxMois.map((total, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border-r border-border px-2 py-2 text-right tabular-nums text-primary",
							children: formaterMontant(total)
						}, j)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 text-right tabular-nums text-primary",
							children: formaterMontant(totalGeneral(grille))
						})
					]
				})] })]
			})
		})
	] });
}
var LIGNES = [
	{
		libelle: "Solde initial de trésorerie",
		cle: "soldeInitial"
	},
	{
		libelle: "Total des encaissements (+)",
		cle: "encaissements"
	},
	{
		libelle: "Disponibilités (=)",
		cle: "disponibilites"
	},
	{
		libelle: "Total des décaissements (−)",
		cle: "decaissements"
	},
	{
		libelle: "Solde mensuel (=)",
		cle: "soldeMensuel"
	},
	{
		libelle: "Solde cumulé de trésorerie",
		cle: "soldeCumule",
		accent: true
	}
];
function TableauSituation({ situation, uniteMonetaire, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-serif text-xl font-bold text-primary",
		children: "III — Situation de trésorerie"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-sm text-muted-foreground",
		children: "Le solde cumulé de chaque mois devient le solde initial du mois suivant."
	})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `overflow-x-auto border border-border bg-card ${compact ? "" : "mt-4"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[1100px] border-collapse text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border bg-secondary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "w-10 border-r border-border px-2 py-2 text-left font-semibold text-primary",
						children: "N°"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "min-w-[260px] border-r border-border px-3 py-2 text-left font-semibold text-primary",
						children: "Rubriques"
					}),
					MOIS.map((mois) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "border-r border-border px-2 py-2 text-right font-semibold text-primary",
						children: mois
					}, mois))
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: LIGNES.map((ligne, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: `border-b border-border last:border-0 ${ligne.accent ? "bg-secondary font-semibold" : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "border-r border-border px-2 py-1.5 text-muted-foreground",
						children: index + 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "border-r border-border px-3 py-1.5",
						children: ligne.libelle
					}),
					situation[ligne.cle].map((valeur, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: `border-r border-border px-2 py-1.5 text-right tabular-nums ${valeur < 0 ? "font-bold text-destructive" : ""}`,
						children: formaterMontant(valeur)
					}, j))
				]
			}, ligne.cle)) })]
		})
	})] });
}
var entete_officiel_capef_default = "/assets/entete-officiel-capef-BXCuqBXW.png";
function TableauLecture({ titre, intituleColonne, postes, grille, libelleTotal }) {
	const totauxMois = totauxMensuels(grille);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "bloc-impression",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mb-1 font-serif text-sm font-bold text-primary uppercase",
			children: titre
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full border-collapse border border-border text-[11px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "bg-secondary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "border border-border px-1 py-1 text-left font-semibold text-primary",
						children: "N°"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "border border-border px-2 py-1 text-left font-semibold text-primary",
						children: intituleColonne
					}),
					MOIS.map((mois) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "border border-border px-1 py-1 text-right font-semibold text-primary",
						children: mois
					}, mois)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "border border-border px-1 py-1 text-right font-semibold text-primary",
						children: "Total annuel"
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [postes.map((poste, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "border border-border px-1 py-0.5",
					children: i + 1
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "border border-border px-2 py-0.5",
					children: poste
				}),
				MOIS.map((mois, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "border border-border px-1 py-0.5 text-right tabular-nums",
					children: formaterMontant(grille[i]?.[j] ?? 0)
				}, mois)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "border border-border px-1 py-0.5 text-right font-medium tabular-nums",
					children: formaterMontant(totalLigne(grille[i] ?? []))
				})
			] }, poste)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "bg-secondary font-semibold",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "border border-border px-1 py-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "border border-border px-2 py-1 text-primary uppercase",
						children: libelleTotal
					}),
					totauxMois.map((total, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "border border-border px-1 py-1 text-right tabular-nums text-primary",
						children: formaterMontant(total)
					}, j)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "border border-border px-1 py-1 text-right tabular-nums text-primary",
						children: formaterMontant(totalGeneral(grille))
					})
				]
			})] })]
		})]
	});
}
function ApercuImpression({ exercice, periode, uniteMonetaire, institution, encaissements, decaissements, situation }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "zone-impression bg-white p-6 text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: entete_officiel_capef_default,
				alt: "En-tête officiel bilingue de la CAPEF",
				className: "mx-auto block h-auto w-full object-contain"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-xl font-bold tracking-wide text-primary uppercase",
					children: "Plan de Trésorerie"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs",
					children: [
						institution,
						" — Exercice : ",
						exercice,
						" · Période : ",
						periode,
						" · Unité monétaire :",
						" ",
						uniteMonetaire
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableauLecture, {
						titre: "I — Encaissements prévisionnels",
						intituleColonne: "Nature des recettes",
						postes: POSTES_ENCAISSEMENTS,
						grille: encaissements,
						libelleTotal: "Total encaissements mensuels"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableauLecture, {
						titre: "II — Décaissements prévisionnels",
						intituleColonne: "Nature des dépenses",
						postes: POSTES_DECAISSEMENTS,
						grille: decaissements,
						libelleTotal: "Total décaissements mensuels"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "bloc-impression",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-1 font-serif text-sm font-bold text-primary uppercase",
							children: "III — Situation de trésorerie"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableauSituation, {
							situation,
							compact: true
						})]
					})
				]
			})
		]
	});
}
function PageAssistant() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const charger = useServerFn(chargerPlan);
	const enregistrer = useServerFn(enregistrerPlan);
	const [etape, setEtape] = (0, import_react.useState)(1);
	const [nom, setNom] = (0, import_react.useState)("");
	const [exercice, setExercice] = (0, import_react.useState)((/* @__PURE__ */ new Date()).getFullYear());
	const [periode, setPeriode] = (0, import_react.useState)("Janvier-Décembre");
	const [uniteMonetaire, setUniteMonetaire] = (0, import_react.useState)("FCFA");
	const [institution, setInstitution] = (0, import_react.useState)("CAPEF");
	const [soldeInitial, setSoldeInitial] = (0, import_react.useState)(0);
	const [statut, setStatut] = (0, import_react.useState)("brouillon");
	const [encaissements, setEncaissements] = (0, import_react.useState)(() => grilleVide(POSTES_ENCAISSEMENTS.length));
	const [decaissements, setDecaissements] = (0, import_react.useState)(() => grilleVide(POSTES_DECAISSEMENTS.length));
	const { data: plan, isLoading } = useQuery({
		queryKey: ["plan", id],
		queryFn: () => charger({ data: { id } })
	});
	(0, import_react.useEffect)(() => {
		if (!plan) return;
		setNom(plan.nom ?? "");
		setExercice(plan.exercice);
		setPeriode(plan.periode);
		setUniteMonetaire(plan.unite_monetaire);
		setInstitution(plan.institution);
		setSoldeInitial(Number(plan.solde_initial) || 0);
		setStatut(plan.statut === "finalise" ? "finalise" : "brouillon");
		setEncaissements(normaliserGrille(plan.encaissements, POSTES_ENCAISSEMENTS.length));
		setDecaissements(normaliserGrille(plan.decaissements, POSTES_DECAISSEMENTS.length));
	}, [plan]);
	const situation = (0, import_react.useMemo)(() => calculerSituation(encaissements, decaissements, soldeInitial), [
		encaissements,
		decaissements,
		soldeInitial
	]);
	const sauvegarde = useMutation({
		mutationFn: (nouveauStatut) => enregistrer({ data: {
			id,
			nom: nom.trim() || `Plan ${exercice}`,
			exercice,
			periode,
			unite_monetaire: uniteMonetaire,
			institution,
			solde_initial: soldeInitial,
			statut: nouveauStatut,
			encaissements,
			decaissements
		} }),
		onSuccess: (_donnees, nouveauStatut) => {
			setStatut(nouveauStatut);
			toast.success(nouveauStatut === "finalise" ? "Plan finalisé et enregistré." : "Brouillon enregistré.");
		},
		onError: () => toast.error("Enregistrement impossible. Veuillez réessayer.")
	});
	function modifierEncaissement(ligne, mois, valeur) {
		setEncaissements((precedent) => precedent.map((l, i) => i === ligne ? l.map((v, j) => j === mois ? valeur : v) : l));
	}
	function modifierDecaissement(ligne, mois, valeur) {
		setDecaissements((precedent) => precedent.map((l, i) => i === ligne ? l.map((v, j) => j === mois ? valeur : v) : l));
	}
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnTeteApplication, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mx-auto max-w-[1400px] px-6 py-10 text-muted-foreground",
			children: "Chargement du plan…"
		})]
	});
	if (!plan) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnTeteApplication, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1400px] px-6 py-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-2xl font-bold text-primary",
				children: "Plan introuvable"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4",
				onClick: () => navigate({ to: "/plans" }),
				children: "Retour à la liste"
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnTeteApplication, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sans-impression mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-3 px-6 py-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-2xl font-bold text-primary",
					children: nom || `Plan de trésorerie — Exercice ${exercice}`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						"Étape ",
						String(etape).padStart(2, "0"),
						" · ",
						ETAPES[etape - 1],
						" ·",
						" ",
						statut === "finalise" ? "Finalisé" : "Brouillon"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => navigate({ to: "/plans" }),
							children: "Mes plans"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							disabled: sauvegarde.isPending,
							onClick: () => sauvegarde.mutate("brouillon"),
							children: "Enregistrer le brouillon"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: sauvegarde.isPending,
							onClick: () => sauvegarde.mutate("finalise"),
							children: "Finaliser"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarreEtapes, {
				etape,
				onChange: setEtape
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-[1400px] px-6 py-8",
				children: [
					etape === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "max-w-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-xl font-bold text-primary",
							children: "I — Informations générales"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 space-y-5 border border-border bg-card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "nom",
										children: "Nom du plan"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "nom",
										value: nom,
										onChange: (e) => setNom(e.target.value),
										placeholder: `Plan ${exercice}`
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "exercice",
										children: "Exercice"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "exercice",
										type: "number",
										min: 2e3,
										max: 2100,
										value: exercice,
										onChange: (e) => setExercice(Number(e.target.value) || exercice)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "periode",
										children: "Période"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "periode",
										value: periode,
										onChange: (e) => setPeriode(e.target.value),
										placeholder: "Janvier-Décembre"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "unite",
										children: "Unité monétaire"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "unite",
										value: uniteMonetaire,
										onChange: (e) => setUniteMonetaire(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "solde",
										children: "Solde initial de trésorerie (Janvier)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "solde",
										type: "number",
										step: "1",
										value: soldeInitial === 0 ? "" : soldeInitial,
										placeholder: "0",
										onChange: (e) => setSoldeInitial(Number(e.target.value) || 0)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "institution",
										children: "Institution"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "institution",
										value: institution,
										onChange: (e) => setInstitution(e.target.value)
									})]
								})
							]
						})]
					}),
					etape === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrilleSaisie, {
						titre: "I — Encaissements prévisionnels",
						intituleColonne: "Nature des recettes",
						postes: POSTES_ENCAISSEMENTS,
						grille: encaissements,
						onChange: modifierEncaissement,
						uniteMonetaire
					}),
					etape === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrilleSaisie, {
						titre: "II — Décaissements prévisionnels",
						intituleColonne: "Nature des dépenses",
						postes: POSTES_DECAISSEMENTS,
						grille: decaissements,
						onChange: modifierDecaissement,
						uniteMonetaire
					}),
					etape === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableauSituation, {
						situation,
						uniteMonetaire
					}),
					etape === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sans-impression mb-4 flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-xl font-bold text-primary",
							children: "Aperçu et impression"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Mise en page A4 paysage. L'interface n'apparaît pas sur le document imprimé."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => window.print(),
							children: "Imprimer"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApercuImpression, {
							exercice,
							periode,
							uniteMonetaire,
							institution,
							encaissements,
							decaissements,
							situation
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sans-impression mt-8 flex justify-between border-t border-border pt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							disabled: etape === 1,
							onClick: () => setEtape(etape - 1),
							children: "Précédent"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: etape === 5,
							onClick: () => setEtape(etape + 1),
							children: "Suivant"
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { PageAssistant as component };
