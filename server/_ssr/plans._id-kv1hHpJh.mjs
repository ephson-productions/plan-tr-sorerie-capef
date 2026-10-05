import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plans._id-kv1hHpJh.js
var $$splitComponentImporter = () => import("./plans._id-DWPmsK7E.mjs");
var Route = createFileRoute("/_authenticated/plans/$id")({
	head: () => ({ meta: [
		{ title: "Assistant de plan de trésorerie — CAPEF" },
		{
			name: "description",
			content: "Saisie guidée des encaissements et décaissements prévisionnels, calcul automatique de la situation de trésorerie."
		},
		{
			property: "og:title",
			content: "Assistant de plan de trésorerie — CAPEF"
		},
		{
			property: "og:description",
			content: "Préparation en cinq étapes du plan de trésorerie annuel de la CAPEF."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
