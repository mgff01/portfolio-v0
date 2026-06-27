"use client";

import { createContext, useContext, useState, useEffect } from "react";

import enUI from "@/data/en/ui.json";
import ptBRUI from "@/data/pt-br/ui.json";

import enProfile from "@/data/en/profile.json";
import ptBRProfile from "@/data/pt-br/profile.json";

import enProjects from "@/data/en/projects.json";
import ptBRProjects from "@/data/pt-br/projects.json";

import enExperience from "@/data/en/experience.json";
import ptBRExperience from "@/data/pt-br/experience.json";

import enCertifications from "@/data/en/certifications.json";
import ptBRCertifications from "@/data/pt-br/certifications.json";

import type { Profile, Project, Experience, Certification } from "@/types/portfolio";

export type Language = "en" | "pt-br";

interface I18nData {
  ui: Record<string, string>;
  profile: Profile;
  projects: Project[];
  experience: Experience[];
  certifications: Certification[];
}

interface I18nContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  data: I18nData;
}

const dataMap = {
  en: {
    ui: enUI,
    profile: enProfile as Profile,
    projects: enProjects as Project[],
    experience: enExperience as Experience[],
    certifications: enCertifications as Certification[],
  },
  "pt-br": {
    ui: ptBRUI,
    profile: ptBRProfile as Profile,
    projects: ptBRProjects as Project[],
    experience: ptBRExperience as Experience[],
    certifications: ptBRCertifications as Certification[],
  },
};

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Retrieve language from localStorage on mount
  useEffect(() => {
    const storedLang = localStorage.getItem("portfolio-lang") as Language;
    if (storedLang === "en" || storedLang === "pt-br") {
      setLanguage(storedLang);
    } else if (typeof navigator !== "undefined") {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("pt")) {
        setLanguage("pt-br");
      } else {
        setLanguage("en");
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("portfolio-lang", lang);
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    data: dataMap[language],
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
