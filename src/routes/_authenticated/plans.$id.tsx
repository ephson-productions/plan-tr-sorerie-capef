import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { chargerPlan, enregistrerPlan } from "@/lib/plans.functions";
import { EnTeteApplication } from "@/components/EnTeteApplication";
import { BarreEtapes, ETAPES } from "@/components/tresorerie/BarreEtapes";
import { GrilleSaisie } from "@/components/tresorerie/GrilleSaisie";
import { TableauSituation } from "@/components/tresorerie/TableauSituation";
import { ApercuImpression } from "@/components/tresorerie/ApercuImpression";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  POSTES_DECAISSEMENTS,
  POSTES_ENCAISSEMENTS,
  calculerSituation,
  grilleVide,
  normaliserGrille,
} from "@/lib/tresorerie";
import type { Grille } from "@/lib/tresorerie";

export const Route = createFileRoute("/_authenticated/plans/$id")({
  head: () => ({
    meta: [
      { title: "Assistant de plan de trésorerie — CAPEF" },
      {
        name: "description",
        content:
          "Saisie guidée des encaissements et décaissements prévisionnels, calcul automatique de la situation de trésorerie.",
      },
      { property: "og:title", content: "Assistant de plan de trésorerie — CAPEF" },
      {
        property: "og:description",
        content: "Préparation en cinq étapes du plan de trésorerie annuel de la CAPEF.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PageAssistant,
});

function PageAssistant() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const charger = useServerFn(chargerPlan);
  const enregistrer = useServerFn(enregistrerPlan);

  const [etape, setEtape] = useState(1);
  const [nom, setNom] = useState("");
  const [exercice, setExercice] = useState(new Date().getFullYear());
  const [periode, setPeriode] = useState("Janvier-Décembre");
  const [uniteMonetaire, setUniteMonetaire] = useState("FCFA");
  const [institution, setInstitution] = useState("CAPEF");
  const [soldeInitial, setSoldeInitial] = useState(0);
  const [statut, setStatut] = useState<"brouillon" | "finalise">("brouillon");
  const [encaissements, setEncaissements] = useState<Grille>(() =>
    grilleVide(POSTES_ENCAISSEMENTS.length),
  );
  const [decaissements, setDecaissements] = useState<Grille>(() =>
    grilleVide(POSTES_DECAISSEMENTS.length),
  );

  const { data: plan, isLoading } = useQuery({
    queryKey: ["plan", id],
    queryFn: () => charger({ data: { id } }),
  });

  useEffect(() => {
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

  const situation = useMemo(
    () => calculerSituation(encaissements, decaissements, soldeInitial),
    [encaissements, decaissements, soldeInitial],
  );

  const sauvegarde = useMutation({
    mutationFn: (nouveauStatut: "brouillon" | "finalise") =>
      enregistrer({
        data: {
          id,
          nom: nom.trim() || `Plan ${exercice}`,
          exercice,
          periode,
          unite_monetaire: uniteMonetaire,
          institution,
          solde_initial: soldeInitial,
          statut: nouveauStatut,
          encaissements,
          decaissements,
        },
      }),
    onSuccess: (_donnees, nouveauStatut) => {
      setStatut(nouveauStatut);
      toast.success(
        nouveauStatut === "finalise" ? "Plan finalisé et enregistré." : "Brouillon enregistré.",
      );
    },
    onError: () => toast.error("Enregistrement impossible. Veuillez réessayer."),
  });

  function modifierEncaissement(ligne: number, mois: number, valeur: number) {
    setEncaissements((precedent) =>
      precedent.map((l, i) => (i === ligne ? l.map((v, j) => (j === mois ? valeur : v)) : l)),
    );
  }

  function modifierDecaissement(ligne: number, mois: number, valeur: number) {
    setDecaissements((precedent) =>
      precedent.map((l, i) => (i === ligne ? l.map((v, j) => (j === mois ? valeur : v)) : l)),
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <EnTeteApplication />
        <p className="mx-auto max-w-[1400px] px-6 py-10 text-muted-foreground">Chargement du plan…</p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-background">
        <EnTeteApplication />
        <div className="mx-auto max-w-[1400px] px-6 py-10">
          <h1 className="font-serif text-2xl font-bold text-primary">Plan introuvable</h1>
          <Button className="mt-4" onClick={() => navigate({ to: "/plans" })}>
            Retour à la liste
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <EnTeteApplication />

      <div className="sans-impression mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-3 px-6 py-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-primary">
            {nom || `Plan de trésorerie — Exercice ${exercice}`}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Étape {String(etape).padStart(2, "0")} · {ETAPES[etape - 1]} ·{" "}
            {statut === "finalise" ? "Finalisé" : "Brouillon"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => navigate({ to: "/plans" })}>
            Mes plans
          </Button>
          <Button
            variant="outline"
            disabled={sauvegarde.isPending}
            onClick={() => sauvegarde.mutate("brouillon")}
          >
            Enregistrer le brouillon
          </Button>
          <Button disabled={sauvegarde.isPending} onClick={() => sauvegarde.mutate("finalise")}>
            Finaliser
          </Button>
        </div>
      </div>

      <BarreEtapes etape={etape} onChange={setEtape} />

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        {etape === 1 && (
          <section className="max-w-2xl">
            <h2 className="font-serif text-xl font-bold text-primary">
              I — Informations générales
            </h2>
            <div className="mt-5 space-y-5 border border-border bg-card p-6">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom du plan</Label>
                <Input
                  id="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder={`Plan ${exercice}`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exercice">Exercice</Label>
                <Input
                  id="exercice"
                  type="number"
                  min={2000}
                  max={2100}
                  value={exercice}
                  onChange={(e) => setExercice(Number(e.target.value) || exercice)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="periode">Période</Label>
                <Input
                  id="periode"
                  value={periode}
                  onChange={(e) => setPeriode(e.target.value)}
                  placeholder="Janvier-Décembre"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unite">Unité monétaire</Label>
                <Input
                  id="unite"
                  value={uniteMonetaire}
                  onChange={(e) => setUniteMonetaire(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="solde">Solde initial de trésorerie (Janvier)</Label>
                <Input
                  id="solde"
                  type="number"
                  step="1"
                  value={soldeInitial === 0 ? "" : soldeInitial}
                  placeholder="0"
                  onChange={(e) => setSoldeInitial(Number(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                />
              </div>
            </div>
          </section>
        )}

        {etape === 2 && (
          <GrilleSaisie
            titre="I — Encaissements prévisionnels"
            intituleColonne="Nature des recettes"
            postes={POSTES_ENCAISSEMENTS}
            grille={encaissements}
            onChange={modifierEncaissement}
            uniteMonetaire={uniteMonetaire}
          />
        )}

        {etape === 3 && (
          <GrilleSaisie
            titre="II — Décaissements prévisionnels"
            intituleColonne="Nature des dépenses"
            postes={POSTES_DECAISSEMENTS}
            grille={decaissements}
            onChange={modifierDecaissement}
            uniteMonetaire={uniteMonetaire}
          />
        )}

        {etape === 4 && <TableauSituation situation={situation} uniteMonetaire={uniteMonetaire} />}

        {etape === 5 && (
          <div>
            <div className="sans-impression mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-serif text-xl font-bold text-primary">
                  Aperçu et impression
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Mise en page A4 paysage. L'interface n'apparaît pas sur le document imprimé.
                </p>
              </div>
              <Button onClick={() => window.print()}>Imprimer</Button>
            </div>
            <div className="border border-border">
              <ApercuImpression
                exercice={exercice}
                periode={periode}
                uniteMonetaire={uniteMonetaire}
                institution={institution}
                encaissements={encaissements}
                decaissements={decaissements}
                situation={situation}
              />
            </div>
          </div>
        )}

        <div className="sans-impression mt-8 flex justify-between border-t border-border pt-5">
          <Button variant="outline" disabled={etape === 1} onClick={() => setEtape(etape - 1)}>
            Précédent
          </Button>
          <Button disabled={etape === 5} onClick={() => setEtape(etape + 1)}>
            Suivant
          </Button>
        </div>
      </main>
    </div>
  );
}
