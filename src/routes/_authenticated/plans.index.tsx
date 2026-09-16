import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import {
  creerPlan,
  dupliquerPlan,
  listerPlans,
  renommerPlan,
  supprimerPlan,
} from "@/lib/plans.functions";
import { EnTeteApplication } from "@/components/EnTeteApplication";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_authenticated/plans/")({
  head: () => ({
    meta: [
      { title: "Mes plans de trésorerie — CAPEF" },
      {
        name: "description",
        content: "Liste des plans de trésorerie annuels de la CAPEF, en brouillon ou finalisés.",
      },
      { property: "og:title", content: "Mes plans de trésorerie — CAPEF" },
      { property: "og:description", content: "Gestion des exercices de trésorerie de la CAPEF." },
    ],
  }),
  component: PageListePlans,
});

function PageListePlans() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const lister = useServerFn(listerPlans);
  const creer = useServerFn(creerPlan);
  const dupliquer = useServerFn(dupliquerPlan);
  const supprimer = useServerFn(supprimerPlan);
  const renommer = useServerFn(renommerPlan);

  const anneeCourante = new Date().getFullYear();
  const [nouvelExercice, setNouvelExercice] = useState(String(anneeCourante));
  const [nouveauNom, setNouveauNom] = useState("");
  const [idEnEdition, setIdEnEdition] = useState<string | null>(null);
  const [nomEnEdition, setNomEnEdition] = useState("");

  const { data: plans, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: () => lister(),
  });

  const creation = useMutation({
    mutationFn: (variables: { exercice: number; nom?: string }) => creer({ data: variables }),
    onSuccess: (plan) => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      if (plan) navigate({ to: "/plans/$id", params: { id: plan.id } });
    },
    onError: () => toast.error("Création impossible. Veuillez réessayer."),
  });

  const duplication = useMutation({
    mutationFn: (variables: { id: string; exercice: number }) => dupliquer({ data: variables }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast.success("Plan dupliqué.");
    },
    onError: () => toast.error("Duplication impossible."),
  });

  const renommage = useMutation({
    mutationFn: (variables: { id: string; nom: string }) => renommer({ data: variables }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      setIdEnEdition(null);
      toast.success("Plan renommé.");
    },
    onError: () => toast.error("Renommage impossible."),
  });

  const suppression = useMutation({
    mutationFn: (id: string) => supprimer({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast.success("Plan supprimé.");
    },
    onError: () => toast.error("Suppression impossible."),
  });

  return (
    <div className="min-h-screen bg-background">
      <EnTeteApplication />
      <main className="mx-auto max-w-[1400px] px-6 py-10">
        <h1 className="font-serif text-3xl font-bold text-primary">Mes plans de trésorerie</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Chaque exercice correspond à un plan annuel de douze mois, en FCFA. Ouvrez un brouillon
          pour le compléter ou créez un nouvel exercice.
        </p>

        <div className="mt-8 flex flex-wrap items-end gap-3 border border-border bg-card p-5">
          <div className="space-y-2">
            <Label htmlFor="exercice">Exercice du nouveau plan</Label>
            <Input
              id="exercice"
              type="number"
              min={2000}
              max={2100}
              value={nouvelExercice}
              onChange={(e) => setNouvelExercice(e.target.value)}
              className="w-40"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nom">Nom du plan</Label>
            <Input
              id="nom"
              value={nouveauNom}
              onChange={(e) => setNouveauNom(e.target.value)}
              placeholder={`Plan ${nouvelExercice}`}
              className="w-72"
            />
          </div>
          <Button
            onClick={() =>
              creation.mutate({
                exercice: Number(nouvelExercice),
                nom: nouveauNom.trim() || undefined,
              })
            }
            disabled={creation.isPending}
          >
            Nouveau plan
          </Button>
        </div>

        <div className="mt-8 border border-border bg-card">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary text-left">
                <th className="px-4 py-3 font-semibold text-primary">Nom du plan</th>
                <th className="px-4 py-3 font-semibold text-primary">Exercice</th>
                <th className="px-4 py-3 font-semibold text-primary">Période</th>
                <th className="px-4 py-3 font-semibold text-primary">Statut</th>
                <th className="px-4 py-3 font-semibold text-primary">Dernière modification</th>
                <th className="px-4 py-3 text-right font-semibold text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-muted-foreground">
                    Chargement…
                  </td>
                </tr>
              )}
              {!isLoading && (plans?.length ?? 0) === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-muted-foreground">
                    Aucun plan enregistré pour le moment.
                  </td>
                </tr>
              )}
              {plans?.map((plan) => (
                <tr key={plan.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium">
                    {idEnEdition === plan.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          autoFocus
                          value={nomEnEdition}
                          onChange={(e) => setNomEnEdition(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && nomEnEdition.trim()) {
                              renommage.mutate({ id: plan.id, nom: nomEnEdition.trim() });
                            }
                            if (e.key === "Escape") setIdEnEdition(null);
                          }}
                          className="h-9 w-56"
                        />
                        <Button
                          size="sm"
                          disabled={renommage.isPending || !nomEnEdition.trim()}
                          onClick={() =>
                            renommage.mutate({ id: plan.id, nom: nomEnEdition.trim() })
                          }
                        >
                          Valider
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setIdEnEdition(null)}>
                          Annuler
                        </Button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="text-left underline decoration-dotted underline-offset-4 hover:text-accent"
                        title="Cliquer pour renommer"
                        onClick={() => {
                          setIdEnEdition(plan.id);
                          setNomEnEdition(plan.nom ?? "");
                        }}
                      >
                        {plan.nom || `Plan ${plan.exercice}`}
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3">{plan.exercice}</td>
                  <td className="px-4 py-3">{plan.periode}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        plan.statut === "finalise"
                          ? "border border-primary px-2 py-0.5 text-xs font-medium text-primary"
                          : "border border-accent px-2 py-0.5 text-xs font-medium text-accent"
                      }
                    >
                      {plan.statut === "finalise" ? "Finalisé" : "Brouillon"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(plan.updated_at).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap justify-end gap-2">
                      <Button
                        size="sm"
                        onClick={() => navigate({ to: "/plans/$id", params: { id: plan.id } })}
                      >
                        Ouvrir
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setIdEnEdition(plan.id);
                          setNomEnEdition(plan.nom ?? "");
                        }}
                      >
                        Renommer
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={duplication.isPending}
                        onClick={() =>
                          duplication.mutate({ id: plan.id, exercice: plan.exercice + 1 })
                        }
                      >
                        Dupliquer en {plan.exercice + 1}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={suppression.isPending}
                        onClick={() => {
                          if (window.confirm(`Supprimer le plan ${plan.exercice} ?`)) {
                            suppression.mutate(plan.id);
                          }
                        }}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
