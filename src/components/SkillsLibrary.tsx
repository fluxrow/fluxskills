import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SKILLS, type Category, type Skill } from "@/data/skills";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SkillCard } from "./SkillCard";
import { SkillModal } from "./SkillModal";
import { useLang } from "@/lib/i18n";
import { toast } from "sonner";

export function SkillsLibrary() {
  const { lang, t } = useLang();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [active, setActive] = useState<Skill | null>(null);

  const FILTERS: { id: "all" | Category; label: string }[] = [
    { id: "all", label: t("filter.all") },
    { id: "dev", label: t("filter.dev") },
    { id: "qa", label: t("filter.qa") },
    { id: "marketing", label: t("filter.marketing") },
    { id: "ops", label: t("filter.ops") },
  ];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SKILLS.filter((s) => {
      if (filter !== "all" && s.category !== filter) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.description[lang].toLowerCase().includes(q) ||
        s.description.en.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        s.platforms.some((p) => p.toLowerCase().includes(q))
      );
    });
  }, [query, filter, lang]);

  return (
    <section>
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("hero.title")}
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
          {t("hero.subtitle")}
        </p>
        <div className="relative mx-auto max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("hero.search")}
            className="h-12 pl-11 text-base"
          />
        </div>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              filter === f.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((s) => (
            <SkillCard key={s.id} skill={s} onOpen={setActive} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
          <p className="mb-4 text-muted-foreground">
            {t("empty.notFound")} <span className="font-mono text-foreground">"{query}"</span>
          </p>
          <Button onClick={() => toast.success(t("empty.requestSent"))}>
            {t("empty.request")}
          </Button>
        </div>
      )}

      <SkillModal skill={active} onClose={() => setActive(null)} />
    </section>
  );
}
