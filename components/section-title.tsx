import React from "react"
interface SectionTitleProps {
  children: React.ReactNode;
  delay?: number;
}

export default function SectionTitle({ children, delay = 0 }: SectionTitleProps) {
  return (
    <h2
      className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4
                    opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </h2>
  );
}
