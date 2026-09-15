import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Connexion — Plan de Trésorerie CAPEF" },
      {
        name: "description",
        content:
          "Accès réservé au personnel autorisé de la CAPEF pour la préparation du plan de trésorerie annuel.",
      },
      { property: "og:title", content: "Connexion — Plan de Trésorerie CAPEF" },
      {
        property: "og:description",
        content: "Outil institutionnel de planification de trésorerie de la CAPEF.",
      },
    ],
  }),
  component: PageConnexion,
});

function PageConnexion() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [modeOubli, setModeOubli] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/plans", replace: true });
    });
  }, [navigate]);

  async function seConnecter(e: React.FormEvent) {
    e.preventDefault();
    setEnCours(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: motDePasse });
    setEnCours(false);
    if (error) {
      toast.error("Connexion impossible : identifiants incorrects.");
      return;
    }
    navigate({ to: "/plans", replace: true });
  }

  async function reinitialiser(e: React.FormEvent) {
    e.preventDefault();
    setEnCours(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setEnCours(false);
    if (error) {
      toast.error("Envoi impossible. Vérifiez l'adresse saisie.");
      return;
    }
    toast.success("Un courriel de réinitialisation vient d'être envoyé.");
    setModeOubli(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md border border-border bg-card p-8">
        <p className="text-center text-xs font-medium tracking-[0.2em] text-accent uppercase">
          République du Cameroun
        </p>
        <h1 className="mt-3 text-center font-serif text-2xl leading-tight font-bold text-primary">
          Plan de Trésorerie CAPEF
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Chambre d'Agriculture, des Pêches, de l'Élevage et des Forêts du Cameroun
        </p>

        <form onSubmit={modeOubli ? reinitialiser : seConnecter} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Adresse électronique</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nom@capef.cm"
            />
          </div>

          {!modeOubli && (
            <div className="space-y-2">
              <Label htmlFor="motdepasse">Mot de passe</Label>
              <Input
                id="motdepasse"
                type="password"
                required
                autoComplete="current-password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
              />
            </div>
          )}

          <Button type="submit" disabled={enCours} className="w-full">
            {enCours
              ? "Veuillez patienter…"
              : modeOubli
                ? "Envoyer le lien de réinitialisation"
                : "Se connecter"}
          </Button>

          <button
            type="button"
            onClick={() => setModeOubli(!modeOubli)}
            className="w-full text-center text-sm text-primary underline-offset-4 hover:underline"
          >
            {modeOubli ? "Retour à la connexion" : "Mot de passe oublié ?"}
          </button>
        </form>

        <p className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          Accès réservé. Les comptes sont créés par l'administration de la CAPEF.
        </p>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          <Link to="/reset-password" className="underline-offset-4 hover:underline">
            Définir un nouveau mot de passe
          </Link>
        </p>
      </div>
    </main>
  );
}
