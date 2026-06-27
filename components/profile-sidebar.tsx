"use client";

import Image from "next/image";
import { Linkedin, Github, Youtube, Mail } from "lucide-react";
import { useI18n } from "./i18n-provider";

export default function ProfileSidebar() {
  const { data: { profile, ui }, language, setLanguage } = useI18n();
  return (
    <aside className="w-full lg:w-[340px] lg:min-h-screen bg-background p-4 sm:p-6 lg:p-8 flex flex-col lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:overflow-y-auto z-50 lg:border-r lg:border-border/30 ">
      {/* Hero Section - Responsive Banner with Profile Photo Overlay */}
      <div className="relative mb-8 sm:mb-6 opacity-0 animate-fade-in-up">
        {/* Banner Image - Full width, limited height on mobile */}
        <div className="relative w-full h-24 sm:h-28 lg:aspect-[16/9] lg:h-auto rounded-lg overflow-hidden">
          <Image
            src={profile.bannerImage || "/images/banner.jpg"}
            alt="Profile banner background"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay for better profile photo contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        </div>
        
        {/* Profile Photo - Prominently large */}
        <div className="absolute -bottom-16 sm:-bottom-14 left-4 w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-xl overflow-hidden border-4 border-background shadow-xl">
          <Image
            src={profile.image || "/images/photo.jpg"}
            alt={`Profile photo of ${profile.name}`}
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>

      {/* Name and Title - Adjusted margin for profile photo overlap */}
      <div className="mt-12 sm:mt-10 mb-6 opacity-0 animate-fade-in-up stagger-1">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1 text-balance">
          {profile.name}
        </h1>
        <p className="text-muted-foreground text-sm">{profile.title}</p>
      </div>

      {/* About Section */}
      <div className="mb-6 opacity-0 animate-fade-in-up stagger-2">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          {ui.about}
        </h2>
        <p className="text-sm text-foreground/90 leading-relaxed">
          {profile.about}
        </p>
      </div>

      {/* Skills Section */}
      <div className="mb-6 opacity-0 animate-fade-in-up stagger-3">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          {ui.skills}
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
          {ui.languages}
        </h2>
        <div className="flex flex-wrap gap-3">
          {profile.languages.map((lang) => {
            const isEnglish = lang.name.includes("English") || lang.name.includes("Inglês");
            const targetLang = isEnglish ? "en" : "pt-br";
            const flagSrc = isEnglish 
              ? "/images/usa-flag-circular-17882.svg" 
              : "/images/brazil-flag-circular-17847.svg";
            
            const isActive = language === targetLang;

            return (
              <button
                key={lang.name}
                onClick={() => setLanguage(targetLang)}
                className={`flex-1 min-w-[120px] text-left rounded-lg p-3 border transition-all duration-300
                            ${isActive 
                              ? "bg-primary/5 border-primary/50 shadow-sm" 
                              : "bg-card border-border/50 hover:border-primary/30"
                            }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={flagSrc} alt={`${lang.name} flag`} fill className="object-cover" />
                  </div>
                  <span className={`text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-foreground"}`}>
                    {lang.name}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{lang.level}</p>
                <div className="h-1 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-1000"
                    style={{ width: `${lang.progress}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Social Links */}
      <div className="flex items-center gap-6 pt-4 opacity-0 animate-fade-in-up stagger-6">
        <a
          href="https://www.linkedin.com/in/mgff01/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-muted-foreground transition-colors duration-200 "
          aria-label="LinkedIn profile"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href="https://github.com/mgff01"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-muted-foreground transition-colors duration-200"
          aria-label="GitHub profile"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href="mailto:mauricio050607@gmail.com"
          className="text-foreground hover:text-muted-foreground transition-colors duration-200"
          aria-label="Send an email"
        >
          <Mail className="w-6 h-6" />
        </a>
      </div>
    </aside>
  );
}
