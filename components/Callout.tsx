import type { Callout as CalloutType } from "@/content/types";

const ICONS: Record<CalloutType["tone"], string> = {
  info: "ℹ️",
  tip: "💡",
  warning: "⚠️",
  success: "✅",
};

export function Callout({ block }: { block: CalloutType }) {
  return (
    <aside className={`callout ${block.tone}`}>
      <div className="flex items-start gap-2">
        <span aria-hidden>{ICONS[block.tone]}</span>
        <div>
          {block.title && (
            <p className="font-semibold mb-1">{block.title}</p>
          )}
          <p>{block.body}</p>
        </div>
      </div>
    </aside>
  );
}
