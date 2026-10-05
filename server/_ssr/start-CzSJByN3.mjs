import { t as createMiddleware } from "./createMiddleware-B_4t7rW1.mjs";
import { t as createCsrfMiddleware } from "./createCsrfMiddleware-jzif2P7h.mjs";
import { t as renderErrorPage } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/start-CzSJByN3.js
function dedupeSerializationAdapters(deduped, serializationAdapters) {
	for (let i = 0, len = serializationAdapters.length; i < len; i++) {
		const current = serializationAdapters[i];
		if (!deduped.has(current)) {
			deduped.add(current);
			if (current.extends) dedupeSerializationAdapters(deduped, current.extends);
		}
	}
}
var createStart = (getOptions) => {
	return {
		getOptions: async () => {
			const options = await getOptions();
			if (options.serializationAdapters) {
				const deduped = /* @__PURE__ */ new Set();
				dedupeSerializationAdapters(deduped, options.serializationAdapters);
				options.serializationAdapters = Array.from(deduped);
			}
			return options;
		},
		createMiddleware
	};
};
function renderLockedPage() {
	return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Indisponible — Plan de Trésorerie CAPEF</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; background: #F7F4EC; color: #232420; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 30rem; width: 100%; text-align: center; padding: 2.5rem 2rem; background: #fff; border: 1px solid #DAD4C3; }
      h1 { font-family: Georgia, "Times New Roman", serif; font-size: 1.3rem; margin: 0 0 0.75rem; color: #1F3A2E; }
      p { color: #6B6A63; margin: 0 0 0.4rem; }
      .contact { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #DAD4C3; font-size: 0.9rem; color: #232420; }
      .contact strong { color: #1F3A2E; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Une erreur est survenue</h1>
      <p>Veuillez contacter l'administrateur système.</p>
      <div class="contact">
        <p><strong>Tél :</strong> 697919470</p>
        <p><strong>Email :</strong> ephsonlazab@gmail.com</p>
        <p>CAC/DACCP — CAPEF</p>
      </div>
    </div>
  </body>
</html>`;
}
function renderUnlockForm(message) {
	return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Déverrouillage</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; background: #F7F4EC; color: #232420; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 24rem; width: 100%; padding: 2rem; background: #fff; border: 1px solid #DAD4C3; }
      h1 { font-family: Georgia, "Times New Roman", serif; font-size: 1.15rem; margin: 0 0 1.25rem; color: #1F3A2E; }
      label { display: block; font-size: 0.82rem; color: #6B6A63; margin-bottom: 6px; }
      input { width: 100%; box-sizing: border-box; border: 1px solid #DAD4C3; padding: 9px 10px; font-size: 0.95rem; margin-bottom: 14px; }
      button { width: 100%; border: none; background: #1F3A2E; color: #fff; padding: 10px; font-size: 0.9rem; cursor: pointer; }
      button:hover { background: #2C4F3D; }
      .error { color: #A23B2E; font-size: 0.85rem; margin: -6px 0 14px; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Déverrouillage administrateur</h1>
      <form method="POST" action="/deverrouillage">
        <label for="pw">Mot de passe de déverrouillage</label>
        <input type="password" id="pw" name="password" autofocus required />
        ${message ? `<div class="error">${message}</div>` : ""}
        <button type="submit">Déverrouiller</button>
      </form>
    </div>
  </body>
</html>`;
}
function renderUnlockSuccess() {
	return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Déverrouillé</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; background: #F7F4EC; color: #232420; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 24rem; width: 100%; text-align: center; padding: 2rem; background: #fff; border: 1px solid #DAD4C3; }
      h1 { font-family: Georgia, "Times New Roman", serif; font-size: 1.15rem; margin: 0 0 1rem; color: #1F3A2E; }
      a { color: #1F3A2E; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Application déverrouillée</h1>
      <p><a href="/">Retourner à l'application</a></p>
    </div>
  </body>
</html>`;
}
var html = (body, status = 200) => new Response(body, {
	status,
	headers: { "content-type": "text/html; charset=utf-8" }
});
var licenseLockMiddleware = createMiddleware().server(async ({ request, next }) => {
	if (new URL(request.url).pathname === "/deverrouillage") {
		const { tenterDeverrouillage } = await import("./license-lock.server-D6tulrdj.mjs");
		if (request.method === "POST") {
			const form = await request.formData();
			return html(tenterDeverrouillage(String(form.get("password") || "")) ? renderUnlockSuccess() : renderUnlockForm("Mot de passe incorrect."));
		}
		return html(renderUnlockForm());
	}
	const { estVerrouille } = await import("./license-lock.server-D6tulrdj.mjs");
	if (estVerrouille()) return html(renderLockedPage(), 503);
	return next();
});
var errorMiddleware = createMiddleware().server(async ({ next }) => {
	try {
		return await next();
	} catch (error) {
		if (error != null && typeof error === "object" && "statusCode" in error) throw error;
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
});
var csrfMiddleware = createCsrfMiddleware({ filter: (ctx) => ctx.handlerType === "serverFn" });
var startInstance = createStart(() => ({ requestMiddleware: [
	licenseLockMiddleware,
	errorMiddleware,
	csrfMiddleware
] }));
//#endregion
export { startInstance };
