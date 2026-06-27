"use client";

import { useI18n } from "./i18n-provider";
import { Button } from "./ui/button";
import Image from "next/image";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pt-br" : "en");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleLanguage}
      className="rounded-full w-10 h-10 border-border/50 hover:border-primary/50 shadow-sm overflow-hidden p-0 relative group"
    >
      <Image
        src={language === "en" ? "/images/usa-flag-circular-17882.svg" : "/images/brazil-flag-circular-17847.svg"}
        alt={language === "en" ? "English" : "Português"}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-300"
      />
    </Button>
  );
}
