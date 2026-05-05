import { useState } from "react";
import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SKILLS, WORKFLOWS } from "@/data/skills";
import { toast } from "sonner";

export function CommunitySection() {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("You're on the waitlist!");
    setEmail("");
  };

  const stats = [
    { value: SKILLS.length, label: "skills" },
    { value: WORKFLOWS.length, label: "workflows" },
    { value: 12, label: "contributors" },
  ];

  return (
    <section className="mx-auto max-w-2xl text-center">
      <span className="mb-4 inline-block rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">
        Coming soon
      </span>
      <h1 className="mb-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        A community for AI builders
      </h1>
      <p className="mb-8 text-muted-foreground">
        Share your own skills, vote on the best ones and shape FluxSkills together.
      </p>

      <form onSubmit={submit} className="mx-auto mb-6 flex max-w-md flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="h-11 pl-9"
          />
        </div>
        <Button type="submit" className="h-11">Join waitlist</Button>
      </form>

      <Button asChild variant="secondary" className="mb-12 gap-2">
        <a href="https://github.com/fluxrow/fluxskills" target="_blank" rel="noreferrer">
          <Github className="h-4 w-4" />
          Contribute on GitHub
        </a>
      </Button>

      <div className="grid grid-cols-3 gap-4 border-t border-border pt-8">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="font-mono text-2xl font-semibold text-foreground">{s.value}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}