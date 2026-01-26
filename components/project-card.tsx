"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  href?: string;
  delay?: number;
}

export default function ProjectCard({
  title,
  description,
  image,
  href = "#",
  delay = 0,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="group block opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className="relative overflow-hidden rounded-lg bg-card border border-border/50 
                      transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
      >
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={`Screenshot of ${title} project`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Hover Overlay */}
          <div
            className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 
                          transition-colors duration-300 flex items-center justify-center"
          >
            <div
              className="w-12 h-12 rounded-full bg-foreground/90 flex items-center justify-center
                            opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 
                            transition-all duration-300"
            >
              <ArrowUpRight className="w-5 h-5 text-background" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  );
}
