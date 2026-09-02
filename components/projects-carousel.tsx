"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/portfolio";
import ProjectCard from "./project-card";

interface ProjectsCarouselProps {
  projects: Project[];
  onSelect: (project: Project) => void;
}

export default function ProjectsCarousel({ projects, onSelect }: ProjectsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(projects.length <= 1);

  const updatePosition = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const firstSlide = track.firstElementChild as HTMLElement | null;
    const slideWidth = firstSlide?.offsetWidth ?? track.clientWidth;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0");
    const nextIndex = Math.round(track.scrollLeft / Math.max(slideWidth + gap, 1));

    setActiveIndex(Math.min(nextIndex, projects.length - 1));
    setIsAtStart(track.scrollLeft <= 2);
    setIsAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
  }, [projects.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updatePosition();
    const observer = new ResizeObserver(updatePosition);
    observer.observe(track);
    return () => observer.disconnect();
  }, [updatePosition]);

  const scrollBySlide = (direction: 1 | -1) => {
    const track = trackRef.current;
    const firstSlide = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstSlide) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0");
    track.scrollBy({ left: direction * (firstSlide.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={updatePosition}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:gap-5"
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="w-[88%] shrink-0 snap-start sm:w-[70%] xl:w-[calc(50%_-_0.625rem)]"
          >
            <ProjectCard project={project} onSelect={() => onSelect(project)} priority={index === 0} />
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground" aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => scrollBySlide(-1)}
            disabled={isAtStart}
            aria-label="Previous project"
            className="rounded-full border-border bg-card/80 hover:border-primary/50 hover:text-primary"
          >
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => scrollBySlide(1)}
            disabled={isAtEnd}
            aria-label="Next project"
            className="rounded-full border-border bg-card/80 hover:border-primary/50 hover:text-primary"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
