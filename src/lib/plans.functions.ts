import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { POSTES_DECAISSEMENTS, POSTES_ENCAISSEMENTS, grilleVide } from "./tresorerie";

const grilleSchema = z.array(z.array(z.number()));

const planSchema = z.object({
  id: z.string().uuid(),
  exercice: z.number().int().min(2000).max(2100),
  periode: z.string().min(1).max(120),
  unite_monetaire: z.string().min(1).max(20),
  institution: z.string().min(1).max(200),
  solde_initial: z.number(),
  statut: z.enum(["brouillon", "finalise"]),
  encaissements: grilleSchema,
  decaissements: grilleSchema,
});

const COLONNES =
  "id, exercice, periode, unite_monetaire, institution, solde_initial, statut, encaissements, decaissements, created_at, updated_at";

export const listerPlans = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("plans_tresorerie")
      .select("id, exercice, periode, statut, updated_at, unite_monetaire")
      .order("exercice", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const chargerPlan = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: plan, error } = await context.supabase
      .from("plans_tresorerie")
      .select(COLONNES)
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return plan;
  });

export const creerPlan = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { exercice: number }) =>
    z.object({ exercice: z.number().int().min(2000).max(2100) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: plan, error } = await context.supabase
      .from("plans_tresorerie")
      .insert({
        user_id: context.userId,
        exercice: data.exercice,
        periode: "Janvier-Décembre",
        unite_monetaire: "FCFA",
        institution: "CAPEF",
        solde_initial: 0,
        statut: "brouillon",
        encaissements: grilleVide(POSTES_ENCAISSEMENTS.length),
        decaissements: grilleVide(POSTES_DECAISSEMENTS.length),
      })
      .select(COLONNES)
      .single();
    if (error) throw new Error(error.message);
    return plan;
  });

export const enregistrerPlan = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => planSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { id, ...champs } = data;
    const { data: plan, error } = await context.supabase
      .from("plans_tresorerie")
      .update(champs)
      .eq("id", id)
      .select(COLONNES)
      .single();
    if (error) throw new Error(error.message);
    return plan;
  });

export const dupliquerPlan = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; exercice: number }) =>
    z.object({ id: z.string().uuid(), exercice: z.number().int().min(2000).max(2100) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: source, error: erreurSource } = await context.supabase
      .from("plans_tresorerie")
      .select(COLONNES)
      .eq("id", data.id)
      .single();
    if (erreurSource) throw new Error(erreurSource.message);

    const { data: plan, error } = await context.supabase
      .from("plans_tresorerie")
      .insert({
        user_id: context.userId,
        exercice: data.exercice,
        periode: source.periode,
        unite_monetaire: source.unite_monetaire,
        institution: source.institution,
        solde_initial: source.solde_initial,
        statut: "brouillon",
        encaissements: source.encaissements,
        decaissements: source.decaissements,
      })
      .select(COLONNES)
      .single();
    if (error) throw new Error(error.message);
    return plan;
  });

export const supprimerPlan = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("plans_tresorerie").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
