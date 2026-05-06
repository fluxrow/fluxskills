import type { Skill } from "@/data/skills";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CategoryBadge } from "./CategoryBadge";
import { CopyButton } from "./CopyButton";
import { useLang } from "@/lib/i18n";

interface Props {
  skill: Skill | null;
  onClose: () => void;
}

export function SkillModal({ skill, onClose }: Props) {
  const { lang, t } = useLang();
  if (!skill) return null;

  const slash =
    skill.command.claude_code ||
    skill.command.antigravity ||
    skill.command.codex ||
    skill.command.claude_ai ||
    "";

  return (
    <Dialog open={!!skill} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto sm:rounded-xl">
        <DialogHeader>
          <div className="flex flex-wrap items-start justify-between gap-3 pr-8">
            <DialogTitle className="font-mono text-base font-semibold tracking-tight">
              {skill.name}
            </DialogTitle>
            <CategoryBadge category={skill.category} />
          </div>
        </DialogHeader>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {skill.description[lang]}
        </p>

        <section>
          <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-foreground">
            {t("modal.whenToUse")}
          </h4>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {skill.when_to_use[lang]}
          </p>
        </section>

        <section>
          <div className="mb-2 flex items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {t("modal.fullPrompt")}
              </h4>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {t("modal.fullPromptHint")}
              </p>
            </div>
            <CopyButton
              value={skill.full_prompt}
              label={t("card.copyPrompt")}
              copiedLabel={t("card.copied")}
              variant="default"
            />
          </div>
          <pre className="max-h-72 overflow-auto rounded-md border border-border bg-secondary/40 p-3 font-mono text-xs leading-relaxed text-foreground whitespace-pre-wrap">
            {skill.full_prompt}
          </pre>
        </section>

        {slash && (
          <section>
            <div className="mb-2 flex items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  {t("modal.slashCommand")}
                </h4>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {t("modal.slashCommandHint")}
                </p>
              </div>
              <CopyButton
                value={slash}
                label={t("card.copyCommand")}
                copiedLabel={t("card.copied")}
                variant="secondary"
              />
            </div>
            <code className="block break-all rounded-md border border-border bg-secondary/40 px-3 py-2 font-mono text-xs text-foreground">
              {slash}
            </code>
          </section>
        )}

        <section>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground">
            {t("modal.platforms")}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {skill.platforms.map((p) => (
              <span
                key={p}
                className="rounded border border-border bg-background/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
              >
                {p}
              </span>
            ))}
          </div>
        </section>

        {skill.tags.length > 0 && (
          <section>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground">
              {t("modal.tags")}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {skill.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-card px-2 py-0.5 text-[10px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}
      </DialogContent>
    </Dialog>
  );
}
