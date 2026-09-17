import logoEphson from "@/assets/ephson-productions-footer.png.asset.json";

export function PiedDePage() {
  return (
    <footer className="sans-impression border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-5 px-6 py-7 sm:flex-row">
        <div className="flex items-center gap-4">
          <img
            src={logoEphson.url}
            alt="Ephson Productions"
            className="h-12 w-auto max-w-[210px] object-contain"
          />
          <span className="hidden h-8 w-px bg-primary-foreground/25 sm:block" aria-hidden="true" />
          <p className="text-center text-sm text-primary-foreground/80 sm:text-left">
            © 2026 Ephson Industries™
          </p>
        </div>
         © 2026 Ephson Industries™       

         Terms
         Privacy
         Security
         Status
      </div>
    </footer>
  );
}