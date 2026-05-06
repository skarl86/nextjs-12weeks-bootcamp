import type { Block } from "@/content/types";
import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="my-3 leading-7 text-[15px] text-ink-700 dark:text-ink-200">
          {block.text}
        </p>
      );
    case "h3":
      return (
        <h3 className="mt-6 mb-2 text-lg font-semibold text-ink-900 dark:text-ink-50">
          {block.text}
        </h3>
      );
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag
          className={`my-3 ml-5 space-y-1 text-[15px] leading-7 text-ink-700 dark:text-ink-200 ${
            block.ordered ? "list-decimal" : "list-disc"
          }`}
        >
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </Tag>
      );
    }
    case "code":
      return <CodeBlock block={block} />;
    case "callout":
      return <Callout block={block} />;
  }
}
