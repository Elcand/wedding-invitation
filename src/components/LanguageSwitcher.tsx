"use client";

import { Languages } from "lucide-react";
import { useLanguage, type Language } from "@/lib/language";

const languages: Language[] = ["id", "en"];

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border border-[#f5f2eb]/25 bg-[#171815]/25 p-0.5 backdrop-blur-sm" role="group" aria-label={t("language.label")}>
      <Languages size={13} className="ml-1.5 mr-0.5 text-[#e0c79c]" strokeWidth={1.5} aria-hidden="true" />
      {languages.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLanguage(item)}
          aria-pressed={language === item}
          aria-label={item === "id" ? t("language.switchToId") : t("language.switchToEn")}
          className={`rounded-full px-2 py-1 text-[0.55rem] font-bold uppercase tracking-[0.12em] transition-colors ${
            language === item ? "bg-[#e0c79c] text-[#171815]" : "text-[#f5f2eb]/65 hover:text-[#f5f2eb]"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
