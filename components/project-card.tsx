"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  date?: string;
  image: string;
  href?: string;
  delay?: number;
  tags?: string[];
  onClick?: () => void;
}

export default function ProjectCard({
  title,
  description,
  image,
  date,
  href = "#",
  delay = 0,
  tags,
  onClick,
}: ProjectCardProps) {
  const Component: any = onClick ? "button" : Link;

  return (
    <Component
      {...(onClick ? { onClick, type: "button" } : { href })}
      className="group block opacity-0 animate-fade-in-up text-left"
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className="relative overflow-hidden rounded-xl bg-card border border-border/50 
                   transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10
                   h-full flex flex-col"
      >
        {/* Image Container - uniform aspect */}
        <div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
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
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-grow">
            {description}
          </p>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 mb-1">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-[10px] sm:text-xs font-medium bg-primary/10 text-primary rounded-md"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-2 py-1 text-[10px] sm:text-xs font-medium bg-muted text-muted-foreground rounded-md">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}

          {date && (
            <div className="text-sm text-muted-foreground mt-3">{date}</div>
          )}
        </div>
      </div>
    </Component>
  );
}
