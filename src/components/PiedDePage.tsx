import logoEphson from "@/assets/ephson-productions-footer.png.asset.json";

export function PiedDePage() {
  return (
    <footer className="sans-impression border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <img
            src={logoEphson.url}
            alt="Ephson Productions"
            className="h-9 w-auto max-w-[160px] object-contain"
          />
          <span className="hidden h-6 w-px bg-primary-foreground/25 sm:block" aria-hidden="true" />
          <p className="text-center text-xs text-primary-foreground/80 sm:text-left">
            © 2026 Ephson Industries™
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-primary-foreground/80">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Security</span>
          <span>Status</span>
        </div>
      </div>
    </footer>
  );
}