import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, X, ExternalLink } from "lucide-react";
import type { Workflow } from "@/data/skills";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CopyButton } from "./CopyButton";

interface Props {
  workflow: Workflow | null;
  onClose: () => void;
}

export function WorkflowWizard({ workflow, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const totalSteps = useMemo(() => {
    if (!workflow) return 0;
    return 2 + workflow.elicitation.length; // intro + questions + result
  }, [workflow]);

  if (!workflow) return null;

  const generated = workflow.command_template.replace(/\{(\w+)\}/g, (_, k) => answers[k] || `{${k}}`);
  const progress = ((step + 1) / totalSteps) * 100;

  const reset = () => {
    setStep(0);
    setAnswers({});
    onClose();
  };

  const isQuestionStep = step > 0 && step <= workflow.elicitation.length;
  const currentQuestion = isQuestionStep ? workflow.elicitation[step - 1] : null;
  const canAdvance = !currentQuestion || (answers[currentQuestion.id]?.trim() ?? "") !== "";

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-8">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Workflow wizard</p>
          <p className="font-mono text-sm text-foreground">{workflow.name}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={reset}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="h-1 w-full bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-8 sm:px-8 sm:py-12">
        {step === 0 && (
          <div className="flex flex-1 flex-col">
            <h2 className="mb-3 text-2xl font-semibold sm:text-3xl">{workflow.name}</h2>
            <p className="mb-6 text-muted-foreground">{workflow.description}</p>
            <div className="mb-8">
              <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">
                Skills used in sequence
              </p>
              <div className="space-y-2">
                {workflow.skills_used.map((s, i) => (
                  <div
                    key={s}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 font-mono text-xs text-primary">
                      {i + 1}
                    </span>
                    <span className="font-mono text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentQuestion && (
          <div className="flex flex-1 flex-col">
            <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
              Question {step} of {workflow.elicitation.length}
            </p>
            <h2 className="mb-8 text-2xl font-semibold sm:text-3xl">{currentQuestion.question}</h2>

            {currentQuestion.type === "text" && (
              <Input
                autoFocus
                value={answers[currentQuestion.id] || ""}
                onChange={(e) =>
                  setAnswers({ ...answers, [currentQuestion.id]: e.target.value })
                }
                placeholder="Type your answer..."
                className="h-12 text-base"
              />
            )}

            {currentQuestion.type === "select" && (
              <Select
                value={answers[currentQuestion.id] || ""}
                onValueChange={(v) =>
                  setAnswers({ ...answers, [currentQuestion.id]: v })
                }
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {currentQuestion.options?.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {currentQuestion.type === "boolean" && (
              <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                <Switch
                  checked={answers[currentQuestion.id] === "Yes"}
                  onCheckedChange={(c) =>
                    setAnswers({ ...answers, [currentQuestion.id]: c ? "Yes" : "No" })
                  }
                />
                <Label className="text-sm">{answers[currentQuestion.id] || "No"}</Label>
              </div>
            )}
          </div>
        )}

        {step === totalSteps - 1 && (
          <div className="flex flex-1 flex-col">
            <h2 className="mb-2 text-2xl font-semibold sm:text-3xl">Your command is ready</h2>
            <p className="mb-6 text-muted-foreground">
              Copy and paste it into your AI tool to run the workflow.
            </p>
            <pre className="mb-6 max-h-[50vh] overflow-auto rounded-xl border border-border bg-card p-5 font-mono text-sm leading-relaxed text-foreground whitespace-pre-wrap">
              {generated}
            </pre>
            <div className="flex flex-col gap-3 sm:flex-row">
              <CopyButton value={generated} label="Copy command" size="lg" className="flex-1 h-12 text-sm" />
              <Button asChild variant="secondary" size="lg" className="flex-1 gap-2">
                <a href="https://claude.ai/" target="_blank" rel="noreferrer">
                  Open in Claude
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border px-4 py-4 sm:px-8">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          {step < totalSteps - 1 ? (
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canAdvance}
              className="gap-2"
            >
              {step === 0 ? "Start" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="secondary" onClick={reset}>
              Done
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}