import { cn } from "@/lib/utils";
import type { Category } from "@/data/skills";
import { CATEGORY_LABEL } from "@/data/skills";

const styles: Record<Category, string> = {
  dev: "bg-cat-dev/15 text-cat-dev border-cat-dev/30",
  qa: "bg-cat-qa/15 text-cat-qa border-cat-qa/30",
  marketing: "bg-cat-marketing/15 text-cat-marketing border-cat-marketing/30",
  ops: "bg-cat-ops/15 text-cat-ops border-cat-ops/30",
};

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium uppercase tracking-wide",
        styles[category]
      )}
    >
      {CATEGORY_LABEL[category]}
    </span>
  );
}