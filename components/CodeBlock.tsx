import type { CodeBlock as CodeBlockType } from "@/content/types";

export function CodeBlock({ block }: { block: CodeBlockType }) {
  return (
    <div className="code-block my-4">
      {block.filename && (
        <div className="filename">
          <span className="opacity-60">{block.lang}</span>
          {" · "}
          {block.filename}
        </div>
      )}
      <pre>
        <code className={`language-${block.lang}`}>{block.code}</code>
      </pre>
    </div>
  );
}
