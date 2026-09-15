CREATE TABLE public.plans_tresorerie (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  exercice integer NOT NULL,
  periode text NOT NULL DEFAULT 'Janvier-Décembre',
  unite_monetaire text NOT NULL DEFAULT 'FCFA',
  institution text NOT NULL DEFAULT 'CAPEF',
  solde_initial numeric NOT NULL DEFAULT 0,
  statut text NOT NULL DEFAULT 'brouillon',
  encaissements jsonb NOT NULL DEFAULT '{}'::jsonb,
  decaissements jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.plans_tresorerie TO authenticated;
GRANT ALL ON public.plans_tresorerie TO service_role;

ALTER TABLE public.plans_tresorerie ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own plans" ON public.plans_tresorerie
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own plans" ON public.plans_tresorerie
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own plans" ON public.plans_tresorerie
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own plans" ON public.plans_tresorerie
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_plans_tresorerie_updated_at
BEFORE UPDATE ON public.plans_tresorerie
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX plans_tresorerie_user_exercice_idx ON public.plans_tresorerie (user_id, exercice DESC);