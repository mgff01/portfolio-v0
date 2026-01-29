"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft, ArrowUpRight, SlidersHorizontal, X } from "lucide-react";
import type { Project } from "@/types/portfolio";
import ProjectModal from "@/components/project-modal";
import projectsData from "@/data/projects.json";

const projects: Project[] = projectsData;

// Extract all unique tags from projects
const allTags = Array.from(
  new Set(projects.flatMap((p) => p.tags || []))
).sort();

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter projects based on search and tags
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||       
        (project.tags || []).some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Tag filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => (project.tags || []).includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <h1 className="text-xl font-bold text-foreground">Projects</h1>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-card border border-border rounded-full
                        text-foreground placeholder:text-muted-foreground
                        focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                        transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Tags */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-2 text-muted-foreground mr-2">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            {allTags.map((tag) => (
                <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 text-sm font-medium rounded-full border whitespace-nowrap
                       transition-all duration-200 ${
                       selectedTags.includes(tag)
                         ? "bg-primary text-background border-primary"
                         : "bg-transparent border-border text-foreground hover:border-primary hover:text-primary"
                       }`}
                >
                {tag}
                </button>
            ))}
            {(selectedTags.length > 0 || searchQuery) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-medium text-destructive hover:text-destructive/80 
                          whitespace-nowrap transition-colors duration-200"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  opacity: { duration: 0.2 },
                }}
              >
                <ProjectCard project={project} onSelect={() => openModal(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No projects found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium
                        hover:bg-primary/90 transition-colors duration-200"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </main>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  onSelect: () => void;
}

function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <button
      onClick={onSelect}
      className="group block w-full text-left"
      aria-label={`View ${project.title} details`}
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative overflow-hidden rounded-xl bg-card border border-border/50 
                   transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10
                   h-full flex flex-col"
      >
        {/* Image Container - Uniform aspect ratio */}
        <div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />

          {/* Hover Arrow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-primary/30 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 bg-background"
            >
              <ArrowUpRight className="w-6 h-6 text-foreground" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-grow">
            {project.description}
          </p>

          {/* Project Date */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground font-bold mb-4 absolute right-8 md:right-10"
          >
            {project.date || 2025}
          </motion.p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </button>
  );
}
