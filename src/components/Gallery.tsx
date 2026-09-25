"use client";

import Image from "next/image";
import { ArrowUpRight, Camera } from "lucide-react";
import { useLanguage, type TranslationKey } from "@/lib/language";

const galleryItems: { src: string; altId: string; altEn: string; className: string; position: string; label: TranslationKey }[] = [
  {
    src: "/assets/photos/photo-placehoder1.jpg",
    altId: "Potret dekat Gabriel dan Yunita",
    altEn: "Close-up portrait of Gabriel and Yunita",
    className: "md:col-span-7 md:row-span-2 aspect-[4/5]",
    position: "object-[38%_35%]",
    label: "gallery.labelOne",
  },
  {
    src: "/assets/photos/photo-placeholder2.jpg",
    altId: "Gabriel dan Yunita merayakan hari pernikahan",
    altEn: "Gabriel and Yunita celebrating their wedding day",
    className: "md:col-span-5 aspect-[4/3]",
    position: "object-[57%_43%]",
    label: "gallery.labelTwo",
  },
  {
    src: "/assets/photos/photo-placehoder1.jpg",
    altId: "Detail bunga putih di tangan pasangan",
    altEn: "Close-up of white flowers in the couple's hands",
    className: "md:col-span-5 aspect-[4/3]",
    position: "object-[52%_86%]",
    label: "gallery.labelThree",
  },
];

export default function Gallery() {
  const { language, t } = useLanguage();

  return (
    <section id="gallery" data-background-video="1" className="py-24 sm:py-32 lg:py-40">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">{t("gallery.eyebrow")}</p>
            <h2 className="mt-5 font-display text-5xl leading-[0.9] tracking-[-0.04em] sm:text-7xl">
              {t("gallery.titleTop")}
              <br />
              <span className="italic text-[#e0c79c]">{t("gallery.titleBottom")}</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#f5f2eb]/45">
            <Camera size={16} strokeWidth={1.3} />
            <span>{t("gallery.selected")}</span>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-12 md:gap-6 lg:mt-20">
          {galleryItems.map((item, index) => (
            <figure key={`${item.label}-${index}`} className={`group relative ${item.className}`}>
              <div className="image-frame h-full min-h-[20rem]">
                <Image
                  src={item.src}
                  alt={language === "id" ? item.altId : item.altEn}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className={`object-cover ${item.position}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171815]/70 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
                <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-[#f5f2eb] sm:bottom-7 sm:left-7 sm:right-7">
                  <span className="max-w-[13rem] font-display text-2xl italic leading-none sm:text-3xl">{t(item.label)}</span>
                  <ArrowUpRight size={17} className="shrink-0 text-[#e0c79c]" />
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-center text-[0.62rem] uppercase tracking-[0.25em] text-[#f5f2eb]/35">{t("gallery.more")}</p>
      </div>
    </section>
  );
}
