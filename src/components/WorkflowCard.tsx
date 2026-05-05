import { Clock, Play } from "lucide-react";
import type { Workflow } from "@/data/skills";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "./CategoryBadge";

interface Props {
  workflow: Workflow;
  onRun: (workflow: Workflow) => void;
}

export function WorkflowCard({ workflow, onRun }: Props) {
  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-tight text-foreground">{workflow.name}</h3>
        <CategoryBadge category={workflow.category} />
      </div>

      <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-2 py-1 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        {workflow.estimated_time}
      </div>

      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{workflow.description}</p>

      <div className="mb-5 flex flex-wrap gap-1.5">
        {workflow.skills_used.map((s) => (
          <span
            key={s}
            className="rounded border border-border bg-background/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      <Button onClick={() => onRun(workflow)} className="mt-auto w-full gap-2">
        <Play className="h-4 w-4" />
        Run workflow
      </Button>
    </article>
  );
}