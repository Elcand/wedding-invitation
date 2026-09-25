"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/lib/language";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" data-background-video="0" className="hero-section flex flex-col text-[#f5f2eb]">
      <div className="hero-vignette" aria-hidden="true" />

      <div className="relative z-10 flex min-h-[100svh] flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-12">
        <nav className="flex items-center justify-between" aria-label={t("nav.mainAria")}>
          <a href="#home" className="group flex items-center gap-3" aria-label={t("nav.homeAria")}>
            <span className="flex h-10 w-10 items-center justify-center border border-[#f5f2eb]/35 font-display text-lg tracking-tight text-[#f5f2eb] transition-colors group-hover:border-[#e0c79c] group-hover:text-[#e0c79c]">
              J<span className="mx-0.5 text-[#c9aa7a]">&amp;</span>G
            </span>
            <span className="hidden text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-[#f5f2eb]/65 sm:block">
              Jonathan <span className="text-[#c9aa7a]">&amp;</span> Georgia
            </span>
          </a>
          <div className="hidden items-center gap-8 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#f5f2eb]/70 md:flex">
            <a className="transition-colors hover:text-[#e0c79c]" href="#story">
              {t("nav.story")}
            </a>
            <a className="transition-colors hover:text-[#e0c79c]" href="#details">
              {t("nav.details")}
            </a>
            <a className="transition-colors hover:text-[#e0c79c]" href="#rsvp">
              {t("nav.rsvp")}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="#details"
              className="group flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#e0c79c]"
            >
              <span className="hidden sm:inline">{t("nav.explore")}</span>
              <ArrowDown size={14} className="transition-transform group-hover:translate-y-1" />
            </a>
          </div>
        </nav>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="flex flex-1 flex-col items-center justify-center py-24 text-center sm:py-32"
        >
          <p className="eyebrow mb-7">{t("hero.kicker")}</p>
          <h1 className="max-w-5xl font-display text-[clamp(4rem,13vw,11rem)] font-medium leading-[0.78] tracking-[-0.055em] text-[#f5f2eb]">
            Jonathan
            <span className="mx-2 inline-block text-[0.55em] font-normal italic text-[#e0c79c] sm:mx-4">&amp;</span>
            <span className="block sm:inline-block">Georgia</span>
          </h1>
          <div className="mt-9 flex items-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#f5f2eb]/75 sm:mt-12">
            <span className="h-px w-8 bg-[#c9aa7a]/80" />
            <span>30 · 08 · 2026</span>
            <span className="h-px w-8 bg-[#c9aa7a]/80" />
          </div>
          <p className="mt-6 max-w-md text-xs leading-6 text-[#f5f2eb]/65 sm:text-sm">
            {t("hero.location")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col items-center justify-between gap-6 border-t border-[#f5f2eb]/20 pt-5 sm:flex-row"
        >
          <p className="max-w-xs font-display text-sm italic leading-5 text-[#f5f2eb]/75">
            “{t("hero.quote")}”
            <span className="mt-1 block font-sans text-[0.55rem] not-italic uppercase tracking-[0.24em] text-[#c9aa7a]">
              {t("hero.quoteSource")}
            </span>
          </p>
          <a
            href="#couple"
            className="group inline-flex items-center gap-3 rounded-full border border-[#e0c79c]/60 bg-[#171815]/25 px-5 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#f5f2eb] backdrop-blur-sm transition-all hover:border-[#e0c79c] hover:bg-[#e0c79c] hover:text-[#171815]"
          >
            {t("hero.begin")}
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
