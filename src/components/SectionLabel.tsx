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
      <span className="text-[var(--accent)]">[{index}]</span>
      <span>{children}</span>
      <span className="h-px flex-1 bg-[var(--line)]" aria-hidden="true" />
      <span aria-hidden="true" className="opacity-50">+</span>
    </p>
  );
}
