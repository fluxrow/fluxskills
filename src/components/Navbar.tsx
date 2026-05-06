import { cn } from "@/lib/utils";
import logo from "@/assets/logo-fluxskills.png";
import { useLang, type Lang } from "@/lib/i18n";

export type Tab = "skills" | "workflows" | "community";

interface Props {
  active: Tab;
  onChange: (t: Tab) => void;
}

export function Navbar({ active, onChange }: Props) {
  const { lang, setLang, t } = useLang();

  const tabs: { id: Tab; label: string }[] = [
    { id: "skills", label: t("nav.skills") },
    { id: "workflows", label: t("nav.workflows") },
    { id: "community", label: t("nav.community") },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="FluxSkills logo" className="h-7 w-7 rounded-md" />
            <span className="font-mono text-sm font-semibold tracking-tight">FluxSkills</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {tabs.map((tb) => (
              <button
                key={tb.id}
                onClick={() => onChange(tb.id)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  active === tb.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tb.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LangToggle lang={lang} onChange={setLang} />
            <span className="rounded-md border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              Beta
            </span>
          </div>
        </div>
      </header>

      {/* mobile bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 backdrop-blur-md md:hidden">
        <div className="flex items-center justify-around">
          {tabs.map((tb) => (
            <button
              key={tb.id}
              onClick={() => onChange(tb.id)}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 py-3 text-xs font-medium transition-colors",
                active === tb.id ? "text-primary" : "text-muted-foreground"
              )}
            >
              {tb.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}

function LangToggle({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  const opts: Lang[] = ["en", "pt"];
  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center rounded-md border border-border bg-card p-0.5"
    >
      {opts.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          aria-pressed={lang === l}
          className={cn(
            "rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-colors",
            lang === l
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
