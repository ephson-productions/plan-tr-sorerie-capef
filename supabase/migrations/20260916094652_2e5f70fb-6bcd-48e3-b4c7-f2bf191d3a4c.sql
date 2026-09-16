ALTER TABLE public.plans_tresorerie ADD COLUMN IF NOT EXISTS nom text NOT NULL DEFAULT '';
UPDATE public.plans_tresorerie SET nom = 'Plan ' || exercice::text WHERE nom = '';