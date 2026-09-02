"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import CertificationCard from "./certification-card";
import ExperienceCard from "./experience-card";
import ProjectCard from "./project-card";
import ProjectModal from "./project-modal";
import ProjectsCarousel from "./projects-carousel";
import SectionTitle from "./section-title";
import { useI18n } from "./i18n-provider";
import type { Project } from "@/types/portfolio";

export default function MainContent() {
  const {
    data: { certifications, experience, profile, projects, ui },
  } = useI18n();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="relative min-h-screen flex-1 px-5 py-14 sm:px-8 sm:py-16 lg:ml-[360px] lg:px-12 lg:py-14 xl:px-16">
      <div className="mx-auto max-w-[1080px]">
        <header className="mb-16 max-w-3xl opacity-0 animate-fade-in-up">
          <h2 className="text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-[3.5rem]">
            {ui.introTitle}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            {ui.introText}
          </p>
        </header>

        <section id="projects" className="mb-20 scroll-mt-24">
          <div className="mb-6 flex items-end justify-between gap-4">
            <SectionTitle index="01">{ui.projects}</SectionTitle>
            <Link
              href="/projects"
              className="group mb-0.5 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {ui.seeAll}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="hidden md:block">
            <ProjectsCarousel projects={projects} onSelect={setSelectedProject} />
          </div>

          <div className="grid gap-5 md:hidden">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={() => setSelectedProject(project)}
                priority={index === 0}
              />
            ))}
          </div>
        </section>

        <section id="experience" className="mb-20 scroll-mt-24">
          <SectionTitle index="02">{ui.experience}</SectionTitle>
          <div className="mt-6 grid gap-3">
            {experience.map((item) => (
              <ExperienceCard key={item.id} experience={item} />
            ))}
          </div>
        </section>

        <section id="education" className="mb-20 scroll-mt-24">
          <SectionTitle index="03">{ui.education}</SectionTitle>
          <article className="mt-6 grid grid-cols-[auto_1fr] items-center gap-4 rounded-2xl border border-border/75 bg-card/75 p-5 sm:grid-cols-[auto_1fr_auto] sm:p-6">
            <div className="grid size-14 shrink-0 place-items-center rounded-2xl border border-border bg-background/50 text-primary">
              <GraduationCap className="size-6" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-foreground sm:text-base">
                {profile.education.degree}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {profile.education.institution}
              </p>
            </div>
            <span className="col-start-2 w-fit shrink-0 rounded-full border border-border px-3 py-1.5 font-mono text-[10px] text-muted-foreground sm:col-auto sm:text-xs">
              {profile.education.period}
            </span>
          </article>
        </section>

        <section id="certifications" className="scroll-mt-24">
          <SectionTitle index="04">{ui.certifications}</SectionTitle>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {certifications.map((item) => (
              <CertificationCard key={item.id} certification={item} />
            ))}
          </div>
        </section>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
