"use client";

import { useState } from "react";
import ProjectsCarousel from "./projects-carousel";
import ExperienceCard from "./experience-card";
import CertificationCard from "./certification-card";
import SectionTitle from "./section-title";
import ProjectCard from "./project-card";
import ProjectModal from "./project-modal";
import type { Project, Experience, Certification } from "@/types/portfolio";

interface MainContentProps {
  projects: Project[];
  experiences: Experience[];
  certifications: Certification[];
}

export default function MainContent({
  projects,
  experiences,
  certifications,
}: MainContentProps) {
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
          <SectionTitle delay={0.1}>Projects</SectionTitle>
          
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
                onClick={() => openModal(project)}
                delay={0.2 + index * 0.1}
              />
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-16 scroll-mt-20">
          <SectionTitle delay={0.5}>Experience</SectionTitle>
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
          <SectionTitle delay={0.7}>License & Certification</SectionTitle>
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
