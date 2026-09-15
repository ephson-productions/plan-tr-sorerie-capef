import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import {
  creerPlan,
  dupliquerPlan,
  listerPlans,
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
      {
        property: "og:description",
        content: "Gestion des exercices de trésorerie de la CAPEF.",
      },
    ],
  }),
  component: PageListePlans;
});

function PageListePlans() {
  return null;
}
