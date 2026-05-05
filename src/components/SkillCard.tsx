import type { Skill } from "@/data/skills";
import { CategoryBadge } from "./CategoryBadge";
import { CopyButton } from "./CopyButton";

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <article className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
      <header className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-mono text-sm font-semibold tracking-tight text-foreground">
          {skill.name}
        </h3>
        <CategoryBadge category={skill.category} />
      </header>

      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {skill.description}
      </p>

      <div className="mb-4 flex items-center justify-between gap-2 rounded-md border border-border bg-secondary/40 px-3 py-2">
        <code className="truncate font-mono text-xs text-foreground">{skill.command}</code>
        <CopyButton value={skill.full_command} />
      </div>

      <footer className="mt-auto flex flex-wrap gap-1.5">
        {skill.platforms.map((p) => (
          <span
            key={p}
            className="rounded border border-border bg-background/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
          >
            {p}
          </span>
        ))}
      </footer>
    </article>
  );
}