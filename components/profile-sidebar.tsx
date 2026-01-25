"use client";

import Image from "next/image";
import { Linkedin, Github } from "lucide-react";
import type { Profile } from "@/types/portfolio";

interface ProfileSidebarProps {
  profile: Profile;
}

export default function ProfileSidebar({ profile }: ProfileSidebarProps) {
  return (
    <aside className="w-full lg:w-[340px] lg:min-h-screen bg-background p-6 lg:p-8 flex flex-col lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:overflow-y-auto z-50 lg:border-r lg:border-border/30">
      {/* Profile Image */}
      <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-6 opacity-0 animate-fade-in-up">
        <Image
          src={profile.image || "/placeholder.svg"}
          alt={profile.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Name and Title */}
      <div className="mb-6 opacity-0 animate-fade-in-up stagger-1">
        <h1 className="text-2xl font-bold text-foreground mb-1 text-balance">
          {profile.name}
        </h1>
        <p className="text-muted-foreground text-sm">{profile.title}</p>
      </div>

      {/* About Section */}
      <div className="mb-6 opacity-0 animate-fade-in-up stagger-2">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          About
        </h2>
        <p className="text-sm text-foreground/90 leading-relaxed">
          {profile.about}
        </p>
      </div>

      {/* Skills Section */}
      <div className="mb-6 opacity-0 animate-fade-in-up stagger-3">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, index) => (
            <span
              key={skill}
              className="px-3 py-1.5 text-xs font-medium border border-border rounded-md text-foreground 
                         hover:border-primary hover:text-primary transition-colors duration-200 cursor-default
                         opacity-0 animate-scale-in"
              style={{ animationDelay: `${0.4 + index * 0.05}s` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Languages Section */}
      <div className="mb-8 opacity-0 animate-fade-in-up stagger-5">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Languages
        </h2>
        <div className="flex flex-wrap gap-3">
          {profile.languages.map((lang) => (
            <div
              key={lang.name}
              className="flex-1 min-w-[120px] bg-card rounded-lg p-3 border border-border/50
                         hover:border-border transition-colors duration-200"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{lang.flag}</span>
                <span className="text-sm font-medium text-foreground">
                  {lang.name}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{lang.level}</p>
              <div className="h-1 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground rounded-full transition-all duration-1000"
                  style={{ width: `${lang.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Social Links */}
      <div className="flex items-center gap-6 pt-4 opacity-0 animate-fade-in-up stagger-6">
        <a
          href={profile.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary transition-colors duration-200"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href={profile.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary transition-colors duration-200"
          aria-label="GitHub"
        >
          <Github className="w-6 h-6" />
        </a>
      </div>
    </aside>
  );
}
