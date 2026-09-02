"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

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
} satisfies Record<Language, I18nData>;

const I18nContext = createContext<I18nContextProps | undefined>(undefined);
const languageListeners = new Set<() => void>();
const languageStorageKey = "portfolio-lang";

function getBrowserLanguage(): Language {
  const storedLanguage = localStorage.getItem(languageStorageKey);
  if (storedLanguage === "en" || storedLanguage === "pt-br") {
    return storedLanguage;
  }

  return navigator.language.toLowerCase().startsWith("pt") ? "pt-br" : "en";
}

function subscribeToLanguage(callback: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === languageStorageKey) callback();
  };

  languageListeners.add(callback);
  window.addEventListener("storage", handleStorage);
  return () => {
    languageListeners.delete(callback);
    window.removeEventListener("storage", handleStorage);
  };
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore<Language>(
    subscribeToLanguage,
    getBrowserLanguage,
    () => "en",
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleSetLanguage = useCallback((lang: Language) => {
    localStorage.setItem(languageStorageKey, lang);
    languageListeners.forEach((listener) => listener());
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage: handleSetLanguage,
      data: dataMap[language],
    }),
    [handleSetLanguage, language],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
