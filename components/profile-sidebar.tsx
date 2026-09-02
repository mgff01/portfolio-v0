"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useI18n } from "./i18n-provider";

export default function ProfileSidebar() {
  const {
    data: { profile, ui },
    language,
    setLanguage,
  } = useI18n();

  return (
    <aside
      id="about"
      className="relative z-20 w-full border-b border-sidebar-border bg-sidebar/95 px-5 pb-8 pt-24 backdrop-blur-xl sm:px-8 lg:fixed lg:inset-y-0 lg:left-0 lg:w-[360px] lg:overflow-y-auto lg:border-b-0 lg:border-r lg:px-8 lg:py-8"
    >
      <div className="relative mb-16 opacity-0 animate-fade-in-up">
        <div className="relative h-28 overflow-hidden rounded-2xl border border-border/60 bg-card lg:h-32">
          <Image
            src={profile.bannerImage || "/images/banner.jpg"}
            alt=""
            fill
            sizes="(min-width: 1024px) 304px, calc(100vw - 40px)"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sidebar via-sidebar/25 to-transparent" />
        </div>

        <div className="absolute -bottom-12 left-5 size-28 overflow-hidden rounded-2xl border-4 border-sidebar bg-card shadow-2xl shadow-black/50">
          <Image
            src={profile.image || "/images/photo.jpg"}
            alt={`Profile photo of ${profile.name}`}
            fill
            sizes="112px"
            className="object-cover object-top"
            priority
          />
        </div>

      </div>

      <div className="mb-7 opacity-0 animate-fade-in-up stagger-1">
        <h1 className="mb-2 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-[2rem]">
          {profile.name}
        </h1>
        <p className="text-sm font-medium text-primary sm:text-base">{profile.title}</p>
      </div>

      <section className="mb-7 opacity-0 animate-fade-in-up stagger-2" aria-labelledby="about-title">
        <h2 id="about-title" className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {ui.about}
        </h2>
        <p className="text-sm leading-6 text-foreground/75">{profile.about}</p>
      </section>

      <section className="mb-7 opacity-0 animate-fade-in-up stagger-3" aria-labelledby="skills-title">
        <h2 id="skills-title" className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {ui.skills}
        </h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, index) => (
            <span
              key={skill}
              className="rounded-lg border border-border/80 bg-card/70 px-2.5 py-1.5 font-mono text-[11px] text-foreground/80 opacity-0 transition-colors hover:border-primary/50 hover:text-primary animate-scale-in"
              style={{ animationDelay: `${0.25 + index * 0.025}s` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-8 opacity-0 animate-fade-in-up stagger-4" aria-labelledby="languages-title">
        <h2 id="languages-title" className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {ui.languages}
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {profile.languages.map((item) => {
            const isEnglish = item.name.includes("English") || item.name.includes("Inglês");
            const targetLanguage = isEnglish ? "en" : "pt-br";
            const isActive = language === targetLanguage;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setLanguage(targetLanguage)}
                aria-pressed={isActive}
                className={`rounded-xl border p-3 text-left transition-colors ${
                  isActive
                    ? "border-primary/60 bg-primary/10"
                    : "border-border/70 bg-card/60 hover:border-primary/30"
                }`}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-foreground">{item.name}</span>
                  <span className="relative size-5 overflow-hidden rounded-full" aria-hidden="true">
                    <Image
                      src={isEnglish ? "/images/usa-flag-circular-17882.svg" : "/images/brazil-flag-circular-17847.svg"}
                      alt=""
                      fill
                      sizes="20px"
                      className="object-cover"
                    />
                  </span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-border">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${item.progress}%` }} />
                </div>
                <span className="mt-2 block text-[10px] text-muted-foreground">{item.level}</span>
              </button>
            );
          })}
        </div>
      </section>

      <nav className="flex items-center gap-2 border-t border-border/70 pt-5 opacity-0 animate-fade-in-up stagger-5" aria-label="Social links">
        <SocialLink href={profile.social.linkedin} label="LinkedIn">
          <Linkedin className="size-4" />
        </SocialLink>
        <SocialLink href={profile.social.github} label="GitHub">
          <Github className="size-4" />
        </SocialLink>
        <SocialLink href={profile.social.email} label="Email">
          <Mail className="size-4" />
        </SocialLink>
      </nav>
    </aside>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
    >
      <span>{children}</span>
      <span className="hidden text-[11px] font-medium sm:inline">{label}</span>
    </a>
  );
}
