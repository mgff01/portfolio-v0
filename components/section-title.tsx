import type { ReactNode } from "react";

export default function SectionTitle({ children, index }: { children: ReactNode; index: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] font-semibold text-primary">{index}</span>
      <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-foreground/85">
        {children}
      </h2>
      <span className="h-px w-10 bg-border" />
    </div>
  );
}
