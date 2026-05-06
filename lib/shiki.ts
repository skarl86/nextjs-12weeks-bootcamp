import { createHighlighter, type Highlighter } from "shiki";

const LANGS = [
  "typescript",
  "tsx",
  "javascript",
  "jsx",
  "css",
  "bash",
  "docker",
  "json",
  "html",
] as const;

const LANG_ALIASES: Record<string, string> = {
  ts: "typescript",
  js: "javascript",
  dockerfile: "docker",
  text: "plaintext",
  txt: "plaintext",
  "": "plaintext",
};

let highlighterPromise: Promise<Highlighter> | null = null;

export function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light"],
      langs: [...LANGS],
    });
  }
  return highlighterPromise;
}

export function normalizeLang(lang: string) {
  const l = lang.toLowerCase();
  if (l in LANG_ALIASES) return LANG_ALIASES[l];
  if ((LANGS as readonly string[]).includes(l)) return l;
  return "plaintext";
}
