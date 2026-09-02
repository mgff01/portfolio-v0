"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import ProjectCard from "@/components/project-card";
import ProjectModal from "@/components/project-modal";
import type { Project } from "@/types/portfolio";

export default function ProjectsPage() {
  const {
    data: { projects, ui },
  } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const allTags = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.tags ?? []))).sort(),
    [projects],
  );

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();

    return projects.filter((project) => {
      const searchableText = [project.title, project.description, ...(project.tags ?? [])]
        .join(" ")
        .toLocaleLowerCase();
      const matchesSearch = query === "" || searchableText.includes(query);
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => project.tags?.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [projects, searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">{ui.backToHome}</span>
            </Link>
            <div className="text-center">
              <p className="font-mono text-sm font-semibold tracking-tight text-foreground">
                mgff01<span className="text-primary">.</span>
              </p>
              <h1 className="text-xl font-semibold tracking-tight text-foreground">{ui.projects}</h1>
            </div>
            <span className="min-w-10 text-right font-mono text-xs text-muted-foreground">
              {String(filteredProjects.length).padStart(2, "0")}
            </span>
          </div>

          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <label htmlFor="project-search" className="sr-only">
              {ui.searchProjects}
            </label>
            <input
              id="project-search"
              type="search"
              placeholder={ui.searchProjects}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="h-12 w-full rounded-xl border border-border bg-card/80 pl-11 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
                aria-label={ui.clearFilters}
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto pb-1">
            <SlidersHorizontal className="mr-1 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            {allTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  aria-pressed={isSelected}
                  className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10px] transition-colors ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
            {(selectedTags.length > 0 || searchQuery) && (
              <button
                type="button"
                onClick={clearFilters}
                className="shrink-0 px-2 py-1.5 text-xs font-medium text-destructive hover:underline"
              >
                {ui.clearFilters}
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={() => setSelectedProject(project)}
                priority={index < 2}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
            <div className="mb-5 grid size-16 place-items-center rounded-2xl border border-border bg-card">
              <Search className="size-6 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-lg font-semibold text-foreground">{ui.noProjectsFound}</h2>
            <p className="mb-5 text-sm text-muted-foreground">{ui.tryAdjusting}</p>
            <Button type="button" onClick={clearFilters} className="rounded-xl">
              {ui.clearAllFilters}
            </Button>
          </div>
        )}
      </main>

      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
