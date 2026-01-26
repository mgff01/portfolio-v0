"use client";

import Image from "next/image";

interface ExperienceCardProps {
  title: string;
  description: string;
  icon: string;
  delay?: number;
}

export default function ExperienceCard({
  title,
  description,
  icon,
  delay = 0,
}: ExperienceCardProps) {
  return (
    <div
      className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border/50
                    hover:border-border transition-all duration-300 opacity-0 animate-fade-in-up
                    hover:translate-x-1"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
        <Image
          src={icon || "/placeholder.svg"}
          alt={`${title} company logo`}
          width={40}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
}
