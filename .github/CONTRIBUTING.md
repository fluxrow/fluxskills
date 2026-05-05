# Contributing to FluxSkills

Welcome! FluxSkills is a community-driven library of AI skills and workflows. Contributions are validated automatically by CI — if your JSON passes the schema, it merges automatically.

---

## Folder structure

```
fluxskills/
├── skills/
│   ├── dev/           ← development skills
│   ├── qa/            ← quality & review skills
│   ├── marketing/     ← content, ads, growth skills
│   └── ops/           ← tooling & workflow skills
├── workflows/         ← orchestrated skill sequences
├── schema/            ← JSON schemas for validation
└── scripts/           ← CI validation script
```

---

## Adding a skill

1. Fork this repository
2. Create `skills/[category]/[your-skill-name]/skill.json` following the [skill schema](./schema/skill.schema.json)
3. Run `npm test` locally to validate your JSON
4. Open a PR — CI validates and auto-merges if the schema passes

**Valid categories:** `dev` · `qa` · `marketing` · `ops`

### Skill JSON example

```json
{
  "id": "my-skill",
  "name": "SKILL-MY-SKILL",
  "category": "dev",
  "description": "What this skill does in one or two sentences. Max 200 chars.",
  "when_to_use": "Before starting X or when you need Y.",
  "command": {
    "claude_code": "/skill my-skill",
    "claude_ai": "Act as... [activation prompt for claude.ai users]"
  },
  "platforms": ["Claude Code", "claude.ai"],
  "tags": ["tag1", "tag2", "tag3"],
  "author": "your-github-username",
  "version": "1.0.0",
  "created_at": "2026-01-01"
}
```

---

## Adding a workflow

1. Fork this repository
2. Create `workflows/[your-workflow-name]/workflow.json` following the [workflow schema](./schema/workflow.schema.json)
3. Run `npm test` locally to validate
4. Open a PR

### Workflow requirements

- Minimum **3 steps**
- Minimum **2 elicitation questions**
- At least **1 skill** referenced in steps
- `command_template` must use `{variable}` placeholders matching the elicitation `id` fields

---

## Running validation locally

```bash
npm install
npm test
```

All skill.json and workflow.json files are validated against the schemas in `schema/`. Fix any errors before opening a PR.

---

## Commit style

Use conventional commits:

```
feat: add SKILL-MY-SKILL to dev category
fix: correct command for SKILL-TECH-SEARCH on Codex
docs: update contributing guide
```

---

## PR flow

1. Open PR → CI runs schema validation automatically
2. If validation passes → auto-merge via squash
3. If validation fails → CI posts the error as a comment, PR stays open

---

## Skill quality guidelines

- **Specific over generic** — `SKILL-NEXTJS-AUTH` is better than `SKILL-CODING`
- **One job per skill** — if it does two things, split it into two skills
- **Test your command** — verify it works on the listed platforms before submitting
- **Tags matter** — users find skills by searching tags, make them accurate and specific

---

## Code of conduct

Be direct, be helpful, no spam. Skills that promote harmful or deceptive use cases will be removed without notice.
