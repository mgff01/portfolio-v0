"use client";

import Image from "next/image";

interface CertificationCardProps {
  title: string;
  issuer: string;
  icon: string;
  delay?: number;
}

export default function CertificationCard({
  title,
  issuer,
  icon,
  delay = 0,
}: CertificationCardProps) {
  return (
    <div
      className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border/50
                    hover:border-border transition-all duration-300 opacity-0 animate-fade-in-up
                    hover:translate-x-1 cursor-default"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-foreground/5 flex items-center justify-center">
        <Image
          src={icon || "/placeholder.svg"}
          alt={title}
          width={40}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-foreground mb-0.5">{title}</h3>
        <p className="text-xs text-muted-foreground">{issuer}</p>
      </div>
    </div>
  );
}
