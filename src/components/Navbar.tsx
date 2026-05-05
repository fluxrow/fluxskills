import { cn } from "@/lib/utils";
import logo from "@/assets/logo-fluxskills.png";

export type Tab = "skills" | "workflows" | "community";

const tabs: { id: Tab; label: string }[] = [
  { id: "skills", label: "Skills" },
  { id: "workflows", label: "Workflows" },
  { id: "community", label: "Community" },
];

interface Props {
  active: Tab;
  onChange: (t: Tab) => void;
}

export function Navbar({ active, onChange }: Props) {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="FluxSkills logo" className="h-7 w-7 rounded-md" />
            <span className="font-mono text-sm font-semibold tracking-tight">FluxSkills</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => onChange(t.id)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  active === t.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t.label}
              </button>
            ))}
          </nav>

          <span className="rounded-md border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
            Beta
          </span>
        </div>
      </header>

      {/* mobile bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 backdrop-blur-md md:hidden">
        <div className="flex items-center justify-around">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 py-3 text-xs font-medium transition-colors",
                active === t.id ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}