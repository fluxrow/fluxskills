import { useState } from "react";
import { WORKFLOWS, type Workflow } from "@/data/skills";
import { WorkflowCard } from "./WorkflowCard";
import { WorkflowWizard } from "./WorkflowWizard";

export function WorkflowsSection() {
  const [active, setActive] = useState<Workflow | null>(null);

  return (
    <section>
      <div className="mb-10">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight sm:text-4xl">Workflows</h1>
        <p className="text-muted-foreground">
          Multi-skill sequences. Answer a few questions, get a personalized command.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WORKFLOWS.map((w) => (
          <WorkflowCard key={w.id} workflow={w} onRun={setActive} />
        ))}
      </div>

      <WorkflowWizard workflow={active} onClose={() => setActive(null)} />
    </section>
  );
}