<div align="center">

# ⚡ FluxSkills

**The open-source library of AI skills and workflows for builders.**

Discover, copy and run curated, production-tested prompts for **Claude, ChatGPT, Codex and Gemini** — in English and Portuguese.

[Skills](#-skills) · [Workflows](#-workflows) · [How to use](#-how-to-use) · [Contributing](#-contributing) · [Português](#-português)

![Skills](https://img.shields.io/badge/skills-14-orange) ![Workflows](https://img.shields.io/badge/workflows-5-blue) ![Languages](https://img.shields.io/badge/EN%20%2B%20PT--BR-bilingual-green) ![Schema](https://img.shields.io/badge/JSON%20Schema-validated-success) ![License](https://img.shields.io/badge/license-MIT-lightgrey)

</div>

---

## What is this?

Most "prompt libraries" are screenshots of one-liners. **FluxSkills is different:**

- 🧠 **Skills are structured JSON**, validated against a [JSON Schema](schema/skill.schema.json) on every PR via GitHub Actions — not loose text files.
- 🌎 **Every skill is bilingual** (English + Brazilian Portuguese), because the AI tooling gap is biggest outside English-speaking ecosystems.
- 🔧 **Multi-platform commands**: each skill ships with ready-to-run variants for **Claude Code**, **claude.ai**, **AntiGravity**, **Codex** and **Gemini**.
- 🏭 **Battle-tested in production**: these are the exact skills used daily to ship real multi-tenant SaaS products (Next.js + Supabase + Claude) for paying clients.

## 📚 Skills

14 skills across 4 categories. Each one defines `when_to_use`, platform-specific commands and a `full_prompt` you can copy in one click.

| Category | Skills |
|---|---|
| **dev** | `architect-first` · `automation-flows` · `frontend-design` · `mcp-builder` · `tech-search` |
| **qa** | `checklist-runner` · `coderabbit-review` |
| **marketing** | `content-scale` · `data-decision` · `funnel-builder` · `growth-strategy` · `performance-ads` |
| **ops** | `skill-creator` · `synapse` |

**Example — [`mcp-builder`](skills/dev/mcp-builder/skill.json):** build high-quality MCP (Model Context Protocol) servers in Python or TypeScript to connect any AI to any external API.

```json
{
  "id": "mcp-builder",
  "category": "dev",
  "command": {
    "claude_code": "/skill mcp-builder",
    "claude_ai": "You are an MCP server architect. Design tools with clear single-purpose actions..."
  }
}
```

## 🔄 Workflows

Workflows orchestrate multiple skills in sequence for an end-to-end outcome, with built-in elicitation (the AI asks you the right questions before starting):

| Workflow | What it does |
|---|---|
| [`saas-mvp`](workflows/saas-mvp/workflow.json) | Build a complete SaaS MVP — from architecture to production deploy |
| [`landing-page`](workflows/landing-page/workflow.json) | Design + build a high-converting landing page |
| [`n8n-automation`](workflows/n8n-automation/workflow.json) | Design and implement an n8n automation flow |
| [`api-integration`](workflows/api-integration/workflow.json) | Integrate an external API the right way |
| [`instagram-content`](workflows/instagram-content/workflow.json) | Plan and produce Instagram content at scale |

## 🚀 How to use

**1 — In Claude Code / AntiGravity:** copy a skill's `full_prompt` into your skills folder (e.g. `~/.claude/skills/<id>/SKILL.md`) and invoke it with `/skill <id>`.

**2 — In claude.ai / ChatGPT / Gemini:** open the skill's `skill.json`, copy the `command` variant for your platform (or the `full_prompt`) and paste it at the start of your conversation.

**3 — Programmatically:** every skill is schema-validated JSON — fetch it raw and inject it into your own agents, MCP servers or n8n flows:

```bash
curl -s https://raw.githubusercontent.com/fluxrow/fluxskills/main/skills/dev/mcp-builder/skill.json
```

## 🤝 Contributing

New skills and workflows are welcome — especially translations and skills proven in real projects.

1. Read [CONTRIBUTING.md](.github/CONTRIBUTING.md)
2. Use the [new skill](.github/ISSUE_TEMPLATE/new_skill.yml) or [new workflow](.github/ISSUE_TEMPLATE/new_workflow.yml) issue template
3. Run `node scripts/validate-schema.cjs` before opening a PR — CI validates every skill against the schema

## 🗺️ Roadmap

- [ ] Public web UI for browsing/searching skills (already in `src/` — Vite + React + shadcn)
- [ ] CLI: `npx fluxskills add <id>` to install skills into Claude Code with one command
- [ ] MCP server exposing the library directly to any MCP-compatible client
- [ ] More PT-BR/LATAM-focused workflows (WhatsApp automation, Pix checkout flows, LGPD compliance)

---

## 🇧🇷 Português

**FluxSkills é a biblioteca open-source de skills e workflows de IA para builders.** Todas as skills são bilíngues (EN + PT-BR), estruturadas em JSON validado por schema, e testadas em produção em produtos SaaS reais. Copie o `command` da sua plataforma (Claude Code, claude.ai, AntiGravity, Codex ou Gemini) e use. Contribuições em português são muito bem-vindas — veja o [guia de contribuição](.github/CONTRIBUTING.md).

---

<div align="center">

Built in public by [**fluxrow**](https://github.com/fluxrow) · Curitiba, Brazil 🇧🇷

*If this saved you time, a ⭐ helps other builders find it.*

</div>
