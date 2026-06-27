"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectsCarousel from "./projects-carousel";
import ExperienceCard from "./experience-card";
import CertificationCard from "./certification-card";
import SectionTitle from "./section-title";
import ProjectCard from "./project-card";
import ProjectModal from "./project-modal";
import { useI18n } from "./i18n-provider";
import type { Project, Experience, Certification } from "@/types/portfolio";

export default function MainContent() {
  const { data: { projects, experience: experiences, certifications, ui } } = useI18n();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };
  return (
    <main className="lg:ml-[340px] min-h-screen p-6 lg:p-10 pt-20 lg:pt-10 relative z-10">
      {/* Left gradient mask for smooth edge transition */}
      <div className="hidden lg:block fixed left-[340px] top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
      
      <div className="max-w-4xl relative">
        {/* Projects Section */}
        <section id="projects" className="mb-16 scroll-mt-20">
           <div className="flex items-center justify-between mb-4">
            <h2
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider
                         opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              {ui.projects}
            </h2>
            <Link
              href="/projects"
              className="group flex items-center gap-1.5 text-xs font-medium text-muted-foreground 
                         hover:text-primary transition-colors duration-300 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.15s' }}
            >
              {ui.seeAll}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
          
          {/* Desktop Carousel */}
          <div className="hidden md:block">
            <ProjectsCarousel projects={projects} />
          </div>
          
          {/* Mobile Grid */}
          <div className="md:hidden grid grid-cols-1 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                onClick={() => openModal(project)}
                delay={0.2 + index * 0.1}
              />
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-16 scroll-mt-20">
          <SectionTitle delay={0.5}>{ui.experience}</SectionTitle>
          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                title={exp.title}
                description={exp.description}
                icon={exp.icon}
                delay={0.6 + index * 0.1}
              />
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="mb-16 scroll-mt-20">
          <SectionTitle delay={0.7}>{ui.certifications}</SectionTitle>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <CertificationCard
                key={cert.id}
                title={cert.title}
                issuer={cert.issuer}
                icon={cert.icon}
                delay={0.8 + index * 0.1}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Project Modal for Mobile */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </main>
  );
}
