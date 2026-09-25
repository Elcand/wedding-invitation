"use client";

import Image from "next/image";
import { ArrowUpRight, Heart } from "lucide-react";
import { useLanguage, type TranslationKey } from "@/lib/language";

const milestones: { year: string; title: TranslationKey; text: TranslationKey }[] = [
  { year: "2019", title: "story.firstTitle", text: "story.firstText" },
  { year: "2022", title: "story.secondTitle", text: "story.secondText" },
  { year: "2026", title: "story.thirdTitle", text: "story.thirdText" },
];

export default function Story() {
  const { language, t } = useLanguage();

  return (
    <section id="story" data-background-video="0" className="py-24 text-[#171815] sm:py-32 lg:py-40">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <p className="eyebrow !text-[#9b7749]">{t("story.eyebrow")}</p>
            <h2 className="mt-5 max-w-md font-display text-5xl leading-[0.9] tracking-[-0.04em] sm:text-7xl">
              {t("story.titleTop")}
              <br />
              <span className="italic text-[#9b7749]">{t("story.titleBottom")}</span>
            </h2>
            <div className="mt-10 flex items-center gap-3 text-[#9b7749]">
              <Heart size={17} fill="currentColor" strokeWidth={1.2} />
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em]">{t("story.since")}</span>
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-[#171815]/15 sm:left-[1.65rem]" />
              <div className="space-y-14 sm:space-y-20">
                {milestones.map((milestone) => (
                  <article key={milestone.year} className="relative grid grid-cols-[2.3rem_1fr] gap-5 sm:grid-cols-[3.3rem_1fr] sm:gap-8">
                    <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#9b7749] bg-[#e7e1d5] font-display text-lg italic text-[#9b7749] sm:h-[3.3rem] sm:w-[3.3rem] sm:text-2xl">
                      {milestone.year.slice(2)}
                    </div>
                    <div className="pt-1">
                      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-[#9b7749]">{milestone.year}</p>
                      <h3 className="mt-3 font-display text-4xl tracking-[-0.02em] sm:text-5xl">{t(milestone.title)}</h3>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-[#5d5a52]">{t(milestone.text)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="image-frame mt-16 aspect-[16/10] sm:ml-[4.2rem] sm:mt-24">
              <Image
                src="/assets/photos/photo-placeholder2.jpg"
                alt={language === "id" ? "Gabriel dan Yunita merayakan cinta mereka" : "Gabriel and Yunita celebrating their love"}
                fill
                sizes="(max-width: 640px) 100vw, 75vw"
                className="object-cover object-[50%_38%] grayscale-[15%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171815]/50 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 max-w-[13rem] font-display text-2xl italic leading-none text-[#f5f2eb] sm:bottom-8 sm:left-8">
                {t("story.bestYet")}
              </p>
            </div>
          </div>
        </div>

        <a href="#gallery" className="group mt-16 flex items-center justify-between border-t border-[#171815]/15 pt-6 text-[#9b7749] sm:mt-24">
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em]">{t("story.seeMore")}</span>
          <ArrowUpRight size={19} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
    </section>
  );
}
