"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/portfolio";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.4
            }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div 
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl 
                         shadow-2xl shadow-black/40 border border-border/50 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 
                           backdrop-blur-sm border border-border flex items-center justify-center
                           text-foreground hover:bg-primary hover:text-primary-foreground 
                           hover:border-primary transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Project Image */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative w-full aspect-video rounded-t-2xl overflow-hidden"
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={`Screenshot of ${project.title} project`}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent" />
              </motion.div>

              {/* Content */}
              <div className="p-6 md:p-8 -mt-8 relative">
                {/* Title */}
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-2xl md:text-3xl font-bold text-foreground mb-2"
                >
                  {project.title}
                </motion.h2>

                {/* Project Date */}
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-muted-foreground font-bold mb-4 absolute right-8 top-8 md:top-10 md:right-10"
                >
                  {project.date || 2025}
                </motion.p>

                {/* Short Description */}
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-primary font-medium mb-4"
                >
                  {project.description}
                </motion.p>

                {/* Full Description */}
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-sm text-muted-foreground leading-relaxed mb-6"
                >
                  {project.fullDescription || project.description}
                </motion.p>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-2 mb-8"
                  >
                    {project.tags.map((tag, index) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.35 + index * 0.05 }}
                        className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  {project.repoUrl && (
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 h-12 text-base font-medium gap-2 hover:bg-foreground hover:text-background bg-transparent"
                    >
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-5 h-5" />
                        View Repository
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      asChild
                      className="flex-1 h-12 text-background font-medium gap-2 bg-primary hover:bg-primary/90"
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-5 h-5" />
                        Visit Site
                      </a>
                    </Button>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
