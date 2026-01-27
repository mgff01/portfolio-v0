"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import type { Project } from "@/types/portfolio";
import ProjectModal from "./project-modal";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProjectsCarouselProps {
  projects: Project[];
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Total slides including the "See All" card
  const totalSlides = projects.length + 1;

  const handlePrev = () => swiperRef?.slidePrev();
  const handleNext = () => swiperRef?.slideNext();

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <div className="relative group/carousel">
        {/* Navigation Arrows - Desktop Only */}
        <motion.button
          onClick={handlePrev}
          disabled={isBeginning}
          initial={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-30 
                     w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center
                     transition-all duration-300 hidden lg:flex shadow-lg
                     ${isBeginning 
                       ? "opacity-30 cursor-not-allowed" 
                       : "opacity-0 group-hover/carousel:opacity-100 hover:bg-primary hover:border-primary hover:text-primary-foreground"
                     }`}
          aria-label="Previous project"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <motion.button
          onClick={handleNext}
          disabled={isEnd}
          initial={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-30 
                     w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center
                     transition-all duration-300 hidden lg:flex shadow-lg
                     ${isEnd 
                       ? "opacity-30 cursor-not-allowed" 
                       : "opacity-0 group-hover/carousel:opacity-100 hover:bg-primary hover:border-primary hover:text-primary-foreground"
                     }`}
          aria-label="Next project"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>

        {/* Swiper Carousel */}
        <div className="overflow-hidden rounded-xl">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            onSwiper={setSwiperRef}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.1, spaceBetween: 16 },
              768: { slidesPerView: 1.3, spaceBetween: 20 },
              1024: { slidesPerView: 1.8, spaceBetween: 24 },
              1280: { slidesPerView: 2, spaceBetween: 24 },
            }}
            grabCursor
            touchStartPreventDefault={false}
            threshold={10}
            className="!overflow-hidden !px-1 !py-2"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={project.id} className="!h-auto">
                <ProjectSlide 
                  project={project} 
                  index={index} 
                  isActive={index === activeIndex}
                  onSelect={() => openModal(project)}
                />
              </SwiperSlide>
            ))}
            
            {/* See All Projects Card */}
            <SwiperSlide className="!h-auto">
              <SeeAllCard index={projects.length} />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalSlides-1 }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => swiperRef?.slideTo(index)}
              initial={false}
              animate={{
                width: index === activeIndex ? 24 : 8,
                backgroundColor: index === activeIndex ? "var(--primary)" : "var(--border)",
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="h-2 rounded-full"
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}

interface ProjectSlideProps {
  project: Project;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}

function ProjectSlide({ project, index, onSelect }: ProjectSlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="h-full"
    >
      <button
        onClick={onSelect}
        className="group block w-full h-full text-left"
        aria-label={`View ${project.title} details`}
      >
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative overflow-hidden rounded-xl bg-card border border-border/50 
                     transition-shadow duration-500 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10
                     h-full flex flex-col"
        >
          {/* Image Container - Fixed aspect ratio */}
          <div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={`Screenshot of ${project.title} project`}
                fill
                className="object-cover"
              />
            </motion.div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Hover Arrow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-primary/30 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 bg-background"
              >
                <ArrowUpRight className="w-6 h-6 text-foreground" />
              </div>
            </div>
          </div>

          {/* Content - Fixed height */}
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-grow">
              {project.description}
            </p>
            
            {/* Tags - Always at bottom */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.slice(0, 3).map((tag) => (
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
    </motion.div>
  );
}

interface SeeAllCardProps {
  index: number;
}

function SeeAllCard({ index }: SeeAllCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="h-full"
    >
      <Link
        href="/projects"
        className="group block w-full h-full"
        aria-label="See all projects"
      >
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative overflow-hidden rounded-xl bg-card border border-border/50 border-dashed
                     transition-all duration-500 hover:border-primary hover:shadow-xl hover:shadow-primary/10
                     h-full flex flex-col"
        >
          {/* Placeholder area matching image aspect ratio */}
          <div className="relative aspect-[16/10] overflow-hidden flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center group-hover:text-foreground transition-colors duration-300"
            >
              <ArrowRight className="w-10 h-10 group-hover:text-primary-foreground transition-colors duration-300 text-foreground" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-grow justify-center items-center text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
              See All Projects
            </h3>
            <p className="text-sm text-muted-foreground">
              Browse the complete collection
            </p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
