import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Nouveau mot de passe — Plan de Trésorerie CAPEF" },
      {
        name: "description",
        content: "Définir un nouveau mot de passe pour l'accès au plan de trésorerie de la CAPEF.",
      },
      { property: "og:title", content: "Nouveau mot de passe — Plan de Trésorerie CAPEF" },
      {
        property: "og:description",
        content: "Réinitialisation du mot de passe d'accès à l'outil de trésorerie de la CAPEF.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PageNouveauMotDePasse,
});

function PageNouveauMotDePasse() {
  const navigate = useNavigate();
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [enCours, setEnCours] = useState(false);

  async function valider(e: React.FormEvent) {
    e.preventDefault();
    if (motDePasse.length < 8) {
      toast.error("Le mot de passe doit compter au moins 8 caractères.");
      return;
    }
    if (motDePasse !== confirmation) {
      toast.error("Les deux mots de passe ne correspondent pas.");
      return;
    }
    setEnCours(true);
    const { error } = await supabase.auth.updateUser({ password: motDePasse });
    setEnCours(false);
    if (error) {
      toast.error("Modification impossible. Ouvrez à nouveau le lien reçu par courriel.");
      return;
    }
    toast.success("Mot de passe mis à jour.");
    navigate({ to: "/plans", replace: true });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md border border-border bg-card p-8">
        <h1 className="font-serif text-2xl font-bold text-primary">Nouveau mot de passe</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Saisissez le mot de passe qui protégera désormais votre accès.
        </p>
        <form onSubmit={valider} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nouveau">Nouveau mot de passe</Label>
            <Input
              id="nouveau"
              type="password"
              autoComplete="new-password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmation">Confirmation</Label>
            <Input
              id="confirmation"
              type="password"
              autoComplete="new-password"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={enCours}>
            {enCours ? "Enregistrement…" : "Enregistrer le mot de passe"}
          </Button>
        </form>
      </div>
    </main>
  );
}
