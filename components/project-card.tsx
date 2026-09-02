"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
  onSelect: () => void;
  priority?: boolean;
}

export default function ProjectCard({ project, onSelect, priority = false }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group block h-full w-full text-left focus-visible:outline-none"
      aria-label={`View ${project.title} details`}
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/90 shadow-[0_18px_50px_rgb(0_0_0/0.18)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-[0_24px_70px_rgb(0_0_0/0.32)] group-focus-visible:ring-2 group-focus-visible:ring-primary group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-background">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(min-width: 1280px) 500px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-black/10" />

          {project.date && (
            <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-white backdrop-blur-md">
              {project.date}
            </span>
          )}

          <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-6 group-hover:border-primary/70 group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mb-5 line-clamp-3 text-sm leading-6 text-muted-foreground">
            {project.description}
          </p>

          {project.tags && project.tags.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border/80 bg-background/35 px-2 py-1 font-mono text-[10px] text-foreground/65"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="rounded-md border border-border/80 px-2 py-1 font-mono text-[10px] text-muted-foreground">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </button>
  );
}
