import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export function EnTeteApplication() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function seDeconnecter() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  return (
    <header className="sans-impression border-b border-border bg-card">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-6 py-4">
        <div>
          <p className="text-[10px] font-medium tracking-[0.2em] text-accent uppercase">CAPEF</p>
          <Link to="/plans" className="font-serif text-lg font-bold text-primary">
            Plan de Trésorerie
          </Link>
        </div>
        <Button variant="outline" size="sm" onClick={seDeconnecter}>
          Se déconnecter
        </Button>
      </div>
    </header>
  );
}
