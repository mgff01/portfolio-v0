"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/types/portfolio";

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

  const handlePrev = () => swiperRef?.slidePrev();
  const handleNext = () => swiperRef?.slideNext();

  return (
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
          className="!overflow-hidden !px-1 !py-2"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.id}>
              <ProjectSlide 
                project={project} 
                index={index} 
                isActive={index === activeIndex}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {projects.map((_, index) => (
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
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

interface ProjectSlideProps {
  project: Project;
  index: number;
  isActive: boolean;
}

function ProjectSlide({ project, index, isActive }: ProjectSlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <Link
        href={project.href || "#"}
        className="group block"
      >
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative overflow-hidden rounded-xl bg-card border border-border/50 
                     transition-shadow duration-500 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
        >
          {/* Image Container */}
          <div className="relative aspect-video overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
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
            <motion.div 
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
            />
            
            {/* Hover Arrow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-14 h-14 rounded-full bg-primary flex items-center justify-center
                           shadow-lg shadow-primary/30 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100
                           transition-all duration-300"
              >
                <ArrowUpRight className="w-6 h-6 text-primary-foreground" />
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {project.description}
            </p>
            
            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex flex-wrap gap-2 mt-3"
              >
                {project.tags.map((tag, tagIndex) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + tagIndex * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
