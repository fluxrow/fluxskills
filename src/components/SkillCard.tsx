import type { Skill } from "@/data/skills";
import { CategoryBadge } from "./CategoryBadge";
import { CopyButton } from "./CopyButton";
import { useLang } from "@/lib/i18n";

interface Props {
  skill: Skill;
  onOpen: (skill: Skill) => void;
}

export function SkillCard({ skill, onOpen }: Props) {
  const { lang, t } = useLang();
  const slash =
    skill.command.claude_code ||
    skill.command.antigravity ||
    skill.command.codex ||
    "";

  return (
    <article
      onClick={() => onOpen(skill)}
      className="group flex cursor-pointer flex-col rounded-xl border border-border bg-card p-5 text-left transition-colors hover:border-primary/40 focus-within:border-primary/40"
    >
      <header className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-mono text-sm font-semibold tracking-tight text-foreground">
          {skill.name}
        </h3>
        <CategoryBadge category={skill.category} />
      </header>

      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {skill.description[lang]}
      </p>

      {slash && (
        <div className="mb-4 flex items-center justify-between gap-2 rounded-md border border-border bg-secondary/40 px-3 py-2">
          <code className="truncate font-mono text-xs text-foreground">{slash}</code>
        </div>
      )}

      <div className="mb-4 flex items-center gap-2">
        <CopyButton
          value={skill.full_prompt}
          label={t("card.copyPrompt")}
          copiedLabel={t("card.copied")}
          tooltip={t("card.copyTooltip")}
          variant="default"
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(skill);
          }}
          className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {t("card.openDetails")}
        </button>
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
