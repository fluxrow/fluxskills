import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "pt";

const STORAGE_KEY = "fluxskills.lang";

type Dict = Record<string, { en: string; pt: string }>;

export const T: Dict = {
  // Hero
  "hero.title": {
    en: "Curated AI skills, ready to copy.",
    pt: "Skills de IA selecionadas, prontas para copiar.",
  },
  "hero.subtitle": {
    en: "A growing library of prompts and workflows that work in any AI — Claude, ChatGPT, Codex, Gemini.",
    pt: "Uma biblioteca crescente de prompts e workflows que funcionam em qualquer IA — Claude, ChatGPT, Codex, Gemini.",
  },
  "hero.search": {
    en: "Search by context: marketing, automation, saas...",
    pt: "Buscar por contexto: marketing, automação, saas...",
  },
  // Filters
  "filter.all": { en: "All", pt: "Todas" },
  "filter.dev": { en: "Dev", pt: "Dev" },
  "filter.qa": { en: "QA", pt: "QA" },
  "filter.marketing": { en: "Marketing", pt: "Marketing" },
  "filter.ops": { en: "Ops", pt: "Ops" },
  // Cards
  "card.copyPrompt": { en: "Copy prompt", pt: "Copiar prompt" },
  "card.copyCommand": { en: "Copy command", pt: "Copiar comando" },
  "card.copyTooltip": {
    en: "Works in any AI — no installation needed",
    pt: "Funciona em qualquer IA — sem instalação",
  },
  "card.copied": { en: "Copied!", pt: "Copiado!" },
  "card.openDetails": { en: "View details", pt: "Ver detalhes" },
  // Modal
  "modal.whenToUse": { en: "When to use", pt: "Quando usar" },
  "modal.fullPrompt": { en: "Full prompt (works in any AI)", pt: "Prompt completo (funciona em qualquer IA)" },
  "modal.fullPromptHint": {
    en: "Paste this into Claude, ChatGPT, Gemini or any LLM. No installation.",
    pt: "Cole isto no Claude, ChatGPT, Gemini ou qualquer LLM. Sem instalação.",
  },
  "modal.slashCommand": { en: "Slash command", pt: "Comando slash" },
  "modal.slashCommandHint": {
    en: "For users with Claude Code, AntiGravity or Codex installed.",
    pt: "Para usuários com Claude Code, AntiGravity ou Codex instalados.",
  },
  "modal.platforms": { en: "Platforms", pt: "Plataformas" },
  "modal.tags": { en: "Tags", pt: "Tags" },
  // Empty
  "empty.notFound": { en: "No skills found for", pt: "Nenhuma skill encontrada para" },
  "empty.request": { en: "Request this skill", pt: "Solicitar esta skill" },
  "empty.requestSent": {
    en: "Request sent — we'll review it soon!",
    pt: "Pedido enviado — analisaremos em breve!",
  },
  // Nav
  "nav.skills": { en: "Skills", pt: "Skills" },
  "nav.workflows": { en: "Workflows", pt: "Workflows" },
  "nav.community": { en: "Community", pt: "Comunidade" },
};

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof T) => string;
}

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "en" || saved === "pt") return saved;
    return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const t = (key: keyof typeof T) => T[key][lang] ?? T[key].en;

  return <Ctx.Provider value={{ lang, setLang: setLangState, t }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
