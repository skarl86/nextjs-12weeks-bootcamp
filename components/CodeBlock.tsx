import type { CodeBlock as CodeBlockType } from "@/content/types";
import { getHighlighter, normalizeLang } from "@/lib/shiki";
import { CopyButton } from "./CopyButton";

export async function CodeBlock({ block }: { block: CodeBlockType }) {
  const lang = normalizeLang(block.lang);
  const highlighter = await getHighlighter();
  const html = highlighter.codeToHtml(block.code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });

  const displayLang = block.lang || "text";

  return (
    <figure className="code-block my-4">
      <figcaption className="code-block__head">
        <span className="code-block__lang">{displayLang}</span>
        {block.filename && (
          <span className="code-block__filename">{block.filename}</span>
        )}
        <CopyButton code={block.code} />
      </figcaption>
      <div
        className="code-block__body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
