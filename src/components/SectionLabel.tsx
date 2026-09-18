import type { ReactNode } from "react";

/* Small technical section heading used across pages. */
export default function SectionLabel({
  index,
  children,
  className = "",
}: {
  index: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`tiny-label flex items-center gap-3 ${className}`}>
      <span className="border-[2.5px] border-[var(--ink)] bg-[var(--acid)] px-2 py-1 text-[var(--ink)]">
        [{index}]
      </span>
      <span>{children}</span>
      <span className="h-[2.5px] flex-1 bg-[var(--ink)]" aria-hidden="true" />
      <span aria-hidden="true">+</span>
    </p>
  );
}
