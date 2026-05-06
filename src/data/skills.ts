export type Category = "dev" | "qa" | "marketing" | "ops";
export type Lang = "en" | "pt";

export interface SkillCommand {
  claude_code?: string;
  antigravity?: string;
  codex?: string;
  claude_ai?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: Category;
  description: Record<Lang, string>;
  when_to_use: Record<Lang, string>;
  command: SkillCommand;
  full_prompt: string;
  platforms: string[];
  tags: string[];
  author?: string;
  version?: string;
  created_at?: string;
}

// Auto-load every skill.json under /skills at build time.
const skillModules = import.meta.glob<Skill>("/skills/*/*/skill.json", {
  eager: true,
  import: "default",
});

export const SKILLS: Skill[] = Object.values(skillModules).sort((a, b) =>
  a.name.localeCompare(b.name)
);

export interface ElicitationQuestion {
  id: string;
  question: string;
  type: "text" | "select" | "boolean";
  options?: string[];
}

export interface Workflow {
  id: string;
  name: string;
  category: Category;
  estimated_time: string;
  description: string;
  skills_used: string[];
  elicitation: ElicitationQuestion[];
  command_template: string;
}

export const WORKFLOWS: Workflow[] = [
  {
    id: "saas-mvp",
    name: "Build a SaaS MVP from scratch",
    category: "dev",
    estimated_time: "12 weeks",
    description:
      "Orchestrates skills in sequence to build a complete SaaS MVP — from architecture to production deploy.",
    skills_used: ["SKILL-ARCHITECT-FIRST", "SKILL-TECH-SEARCH", "SKILL-CHECKLIST-RUNNER"],
    elicitation: [
      { id: "name", question: "What is the project name?", type: "text" },
      { id: "stack", question: "What is the tech stack?", type: "select", options: ["Next.js + Supabase", "Next.js + Prisma", "Remix + PlanetScale", "Other"] },
      { id: "target", question: "B2B or B2C?", type: "select", options: ["B2B", "B2C", "Both"] },
      { id: "payments", question: "Payment gateway?", type: "select", options: ["Stripe", "No payments needed", "Other"] },
    ],
    command_template:
      "We're building {name}. Stack: {stack}. Target: {target}. Payments via {payments}.\n\nMandatory sequence:\n1. SKILL-ARCHITECT-FIRST — document full architecture before any code\n2. SKILL-TECH-SEARCH — validate lib choices\n3. Build the core product\n4. SKILL-CHECKLIST-RUNNER — validate before deploy\n\nRules: never write code without approved architecture. TypeScript always. Descriptive commits at each step.",
  },
  {
    id: "instagram-content",
    name: "Instagram content batch (30 posts)",
    category: "marketing",
    estimated_time: "2 hours",
    description:
      "Creates a full month of Instagram content: captions, image prompts, hashtags and posting schedule.",
    skills_used: ["SKILL-CONTENT-SCALE"],
    elicitation: [
      { id: "brand", question: "Brand or client name?", type: "text" },
      { id: "niche", question: "What is the niche?", type: "text" },
      { id: "tone", question: "Brand tone of voice?", type: "select", options: ["Professional", "Casual and fun", "Inspirational", "Educational", "Sales-focused"] },
      { id: "goal", question: "Main content goal?", type: "select", options: ["Grow followers", "Generate leads", "Sell products", "Build authority"] },
    ],
    command_template:
      "Create 30 Instagram posts for {brand}, a {niche} brand.\n\nTone: {tone}. Goal: {goal}.\n\nUsing SKILL-CONTENT-SCALE, deliver:\n- 30 captions (with hooks, body, CTA)\n- Image prompt for each post\n- Hashtag set (30 tags)\n- Posting calendar (best times)\n- 5 carousel ideas with all slides\n\nAll content in Brazilian Portuguese.",
  },
  {
    id: "n8n-automation",
    name: "Build a complete n8n automation",
    category: "dev",
    estimated_time: "1 day",
    description:
      "Designs and implements a production-ready n8n workflow with webhooks, conditions, error handling and integrations.",
    skills_used: ["SKILL-AUTOMATION-FLOWS", "SKILL-TECH-SEARCH"],
    elicitation: [
      { id: "trigger", question: "What triggers this automation?", type: "text" },
      { id: "goal", question: "What should it accomplish?", type: "text" },
      { id: "integrations", question: "Which systems does it connect?", type: "text" },
      { id: "error_handling", question: "Need error handling and retries?", type: "select", options: ["Yes, production-grade", "Basic only", "No"] },
    ],
    command_template:
      "Build a complete n8n automation.\n\nTrigger: {trigger}\nGoal: {goal}\nIntegrations: {integrations}\nError handling: {error_handling}\n\nUsing SKILL-AUTOMATION-FLOWS:\n1. Map the full flow before building\n2. Implement each node with clear naming\n3. Add error handling: {error_handling}\n4. Document each node's purpose\n5. Test with real data before delivery",
  },
  {
    id: "landing-page",
    name: "High-converting landing page",
    category: "marketing",
    estimated_time: "3 days",
    description:
      "Builds a complete landing page optimized for conversion — copy, design and technical implementation.",
    skills_used: ["SKILL-FRONTEND-DESIGN", "SKILL-FUNNEL-BUILDER"],
    elicitation: [
      { id: "product", question: "What is the product or service?", type: "text" },
      { id: "audience", question: "Who is the target audience?", type: "text" },
      { id: "offer", question: "What is the main offer/CTA?", type: "text" },
      { id: "stack", question: "Tech stack for implementation?", type: "select", options: ["Next.js", "HTML/CSS", "Webflow", "Framer"] },
    ],
    command_template:
      "Build a high-converting landing page for {product}.\n\nAudience: {audience}\nMain offer: {offer}\nStack: {stack}\n\nUsing SKILL-FUNNEL-BUILDER + SKILL-FRONTEND-DESIGN:\n1. Define the conversion structure (hero, problem, solution, proof, CTA)\n2. Write all copy with hooks and objection handling\n3. Implement in {stack} with mobile-first responsive design\n4. Add tracking events for key actions\n5. Validate conversion elements checklist",
  },
  {
    id: "api-integration",
    name: "Integrate external API into a project",
    category: "dev",
    estimated_time: "1-3 days",
    description:
      "Research, plan and implement a clean external API integration with error handling, types and tests.",
    skills_used: ["SKILL-TECH-SEARCH", "SKILL-ARCHITECT-FIRST", "SKILL-CHECKLIST-RUNNER"],
    elicitation: [
      { id: "api", question: "Which API are you integrating?", type: "text" },
      { id: "purpose", question: "What will this integration do?", type: "text" },
      { id: "stack", question: "Project stack?", type: "text" },
      { id: "auth", question: "Authentication method?", type: "select", options: ["API Key", "OAuth 2.0", "JWT", "Not sure yet"] },
    ],
    command_template:
      "Integrate {api} into our project.\n\nPurpose: {purpose}\nStack: {stack}\nAuth: {auth}\n\nSequence:\n1. SKILL-TECH-SEARCH — research {api} SDK options and best practices\n2. SKILL-ARCHITECT-FIRST — design the integration layer before coding\n3. Implement: client wrapper, error handling, TypeScript types, env config\n4. SKILL-CHECKLIST-RUNNER — validate integration quality\n\nNever expose API keys. Always wrap in a service class. Handle rate limits and errors gracefully.",
  },
];

export const CATEGORY_LABEL: Record<Category, string> = {
  dev: "Dev",
  qa: "QA",
  marketing: "Marketing",
  ops: "Ops",
};