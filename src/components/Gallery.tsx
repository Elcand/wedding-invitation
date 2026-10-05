"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Camera, ChevronLeft, ChevronRight } from "lucide-react";
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
  {
    src: "/assets/photos/photo-placehoder1.jpg",
    altId: "Detail bunga putih di tangan pasangan",
    altEn: "Close-up of white flowers in the couple's hands",
    className: "md:col-span-5 aspect-[4/3]",
    position: "object-[52%_86%]",
    label: "gallery.labelThree",
  },
  {
    src: "/assets/photos/photo-placehoder1.jpg",
    altId: "Detail bunga putih di tangan pasangan",
    altEn: "Close-up of white flowers in the couple's hands",
    className: "md:col-span-5 aspect-[4/3]",
    position: "object-[52%_86%]",
    label: "gallery.labelThree",
  },
  {
    src: "/assets/photos/photo-placehoder1.jpg",
    altId: "Detail bunga putih di tangan pasangan",
    altEn: "Close-up of white flowers in the couple's hands",
    className: "md:col-span-5 aspect-[4/3]",
    position: "object-[52%_86%]",
    label: "gallery.labelThree",
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

const MOBILE_PAGE_SIZE = 6;
const DESKTOP_PAGE_SIZE = 5;
const DESKTOP_QUERY = "(min-width: 1024px)";

const getIsDesktop = () => typeof window !== "undefined" && window.matchMedia(DESKTOP_QUERY).matches;
const getServerIsDesktop = () => true;

const subscribeToDesktop = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia(DESKTOP_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
};

export default function Gallery() {
  const { language, t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  const isDesktop = useSyncExternalStore(subscribeToDesktop, getIsDesktop, getServerIsDesktop);
  const pageSize = isDesktop ? DESKTOP_PAGE_SIZE : MOBILE_PAGE_SIZE;
  const pageCount = Math.ceil(galleryItems.length / pageSize);
  const activePage = Math.min(currentPage, Math.max(pageCount - 1, 0));
  const visibleItems = galleryItems.slice(activePage * pageSize, (activePage + 1) * pageSize);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, pageCount - 1)));
  };

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

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6 lg:mt-20">
          {visibleItems.map((item, index) => (
            <figure key={`${item.label}-${index}`} className={`group relative ${item.className}`}>
              <div className="image-frame h-full min-h-[20rem]">
                <Image
                  src={item.src}
                  alt={language === "id" ? item.altId : item.altEn}
                  fill
                  sizes="(max-width: 768px) 50vw, 60vw"
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

        {pageCount > 0 && (
          <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#f5f2eb]/15 pt-5">
            <button
              type="button"
              onClick={() => goToPage(activePage - 1)}
              disabled={activePage === 0}
              aria-label={t("gallery.previous")}
              className="inline-flex items-center gap-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#c9aa7a] transition-colors hover:text-[#f5f2eb] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={14} />
              <span className="hidden sm:inline">{t("gallery.previous")}</span>
            </button>
            <p className="text-[0.6rem] uppercase tracking-[0.16em] text-[#f5f2eb]/45">
              {t("gallery.page").replace("{current}", String(activePage + 1)).replace("{total}", String(pageCount))}
            </p>
            <button
              type="button"
              onClick={() => goToPage(activePage + 1)}
              disabled={activePage === pageCount - 1}
              aria-label={t("gallery.next")}
              className="inline-flex items-center gap-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[#c9aa7a] transition-colors hover:text-[#f5f2eb] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <span className="hidden sm:inline">{t("gallery.next")}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-[0.62rem] uppercase tracking-[0.25em] text-[#f5f2eb]/35">{t("gallery.more")}</p>
      </div>
    </section>
  );
}