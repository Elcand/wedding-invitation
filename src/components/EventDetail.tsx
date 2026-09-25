"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  Copy,
  ExternalLink,
  Gift,
  MapPin,
  Radio,
  Shirt,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/lib/language";

const EVENT_DATE = new Date("2026-08-30T09:00:00+07:00");
const VENUE = "The Pearl Hotel Jakarta";
const VENUE_ADDRESS = "Jl. Wolter Monginsidi, Kebayoran Baru, Jakarta Selatan";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE)}`;
const BANK_NUMBER = "1234 5678 9012";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const getRemaining = (): Remaining => {
  const difference = Math.max(EVENT_DATE.getTime() - Date.now(), 0);
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const formatNumber = (value: number) => String(value).padStart(2, "0");

export default function EventDetail() {
  const { t } = useLanguage();
  const [remaining, setRemaining] = useState<Remaining | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const update = () => setRemaining(getRemaining());
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const copyBankNumber = async () => {
    try {
      await navigator.clipboard.writeText(BANK_NUMBER);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Wedding Celebration")}&dates=20260830T020000Z/20260830T090000Z&details=${encodeURIComponent(t("event.calendarDetails"))}&location=${encodeURIComponent(`${VENUE}, ${VENUE_ADDRESS}`)}`;

  return (
    <section id="details" data-background-video="2" className="relative py-24 sm:py-32 lg:py-40">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-8 border-b border-[#f5f2eb]/15 pb-10 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">{t("event.eyebrow")}</p>
            <h2 className="mt-5 max-w-2xl font-display text-5xl leading-[0.9] tracking-[-0.04em] sm:text-7xl">
              {t("event.titleTop")}
              <br />
              <span className="italic text-[#e0c79c]">{t("event.titleBottom")}</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-[#f5f2eb]/55 sm:text-right">
            {t("event.intro")}
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
          <div className="glass-panel flex flex-col justify-between p-6 sm:p-10">
            <div>
              <div className="flex items-center justify-between gap-5">
                <div>
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#c9aa7a]">{t("event.countdown")}</p>
                  <p className="mt-2 font-display text-2xl italic text-[#f5f2eb]/90">{t("event.heading")}</p>
                </div>
                <Sparkles size={20} className="text-[#c9aa7a]" strokeWidth={1.25} />
              </div>
              <div className="mt-10 grid grid-cols-4 divide-x divide-[#f5f2eb]/15 border-y border-[#f5f2eb]/15 py-6">
                {[
                  [t("event.days"), remaining?.days],
                  [t("event.hours"), remaining?.hours],
                  [t("event.minutes"), remaining?.minutes],
                  [t("event.seconds"), remaining?.seconds],
                ].map(([label, value]) => (
                  <div key={label as string} className="px-2 text-center first:pl-0 last:pr-0 sm:px-5">
                    <p className="font-display text-4xl leading-none tracking-[-0.03em] text-[#f5f2eb] sm:text-6xl">
                      {formatNumber((value as number | undefined) ?? 0)}
                    </p>
                    <p className="mt-3 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-[#f5f2eb]/45">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <a
              href={calendarUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex w-fit items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#e0c79c]"
            >
              <CalendarDays size={16} strokeWidth={1.5} />
              {t("event.addCalendar")}
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <article className="glass-panel border border-[#f5f2eb]/15 p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9aa7a]/50 text-[#c9aa7a]">
                  <Clock3 size={17} strokeWidth={1.4} />
                </span>
                <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#f5f2eb]/40">01</span>
              </div>
              <h3 className="mt-8 font-display text-3xl">{t("event.holyMatrimony")}</h3>
              <p className="mt-2 text-sm text-[#f5f2eb]/55">{t("event.date")}</p>
              <p className="mt-1 text-sm text-[#f5f2eb]/55">09.00—11.00 WIB</p>
              <div className="mt-7 flex items-center gap-2 text-xs text-[#e0c79c]">
                <MapPin size={14} />
                <span>{VENUE}</span>
              </div>
            </article>
            <article className="glass-panel border border-[#f5f2eb]/15 p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9aa7a]/50 text-[#c9aa7a]">
                  <Sparkles size={17} strokeWidth={1.4} />
                </span>
                <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#f5f2eb]/40">02</span>
              </div>
              <h3 className="mt-8 font-display text-3xl">{t("event.reception")}</h3>
              <p className="mt-2 text-sm text-[#f5f2eb]/55">{t("event.date")}</p>
              <p className="mt-1 text-sm text-[#f5f2eb]/55">11.30—15.00 WIB</p>
              <div className="mt-7 flex items-center gap-2 text-xs text-[#e0c79c]">
                <MapPin size={14} />
                <span>{VENUE}</span>
              </div>
            </article>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative min-h-[22rem] overflow-hidden border border-[#f5f2eb]/15 bg-[#2b2d26] p-7 sm:p-9">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(201,170,122,0.22),transparent_35%),linear-gradient(135deg,rgba(23,24,21,0.12),rgba(23,24,21,0.8))]" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <p className="eyebrow">{t("event.findWay")}</p>
                <MapPin size={18} className="text-[#e0c79c]" strokeWidth={1.4} />
              </div>
              <div>
                <h3 className="max-w-xs font-display text-4xl leading-none">{VENUE}</h3>
                <p className="mt-4 max-w-xs text-xs leading-5 text-[#f5f2eb]/60">{VENUE_ADDRESS}</p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-7 inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#e0c79c]"
                >
                  {t("event.openMaps")}
                  <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-px bg-[#f5f2eb]/15 sm:grid-cols-3">
            <article className="bg-[#20211d] p-6 sm:p-7">
              <Shirt size={19} className="text-[#c9aa7a]" strokeWidth={1.4} />
              <p className="mt-7 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#c9aa7a]">{t("event.attire")}</p>
              <h3 className="mt-3 font-display text-2xl">{t("event.gardenFormal")}</h3>
              <div className="mt-6 flex gap-2" aria-label={t("event.colorLabel")}>
                {["#d8c5a6", "#8a7968", "#ede6d6", "#687265", "#b77b65"].map((color) => (
                  <span
                    key={color}
                    className="h-7 w-7 rounded-full border border-[#f5f2eb]/30"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="mt-4 text-xs leading-5 text-[#f5f2eb]/50">{t("event.attireDesc")}</p>
            </article>
            <article className="bg-[#20211d] p-6 sm:p-7">
              <Gift size={19} className="text-[#c9aa7a]" strokeWidth={1.4} />
              <p className="mt-7 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#c9aa7a]">{t("event.gift")}</p>
              <h3 className="mt-3 font-display text-2xl">{t("event.giftTitle")}</h3>
              <p className="mt-2 text-xs leading-5 text-[#f5f2eb]/50">{t("event.bank")}</p>
              <button
                type="button"
                onClick={copyBankNumber}
                className="mt-6 inline-flex items-center gap-2 text-left text-xs text-[#e0c79c] transition-colors hover:text-[#f5f2eb]"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? t("event.copied") : BANK_NUMBER}
              </button>
            </article>
            <article className="bg-[#20211d] p-6 sm:p-7">
              <Radio size={19} className="text-[#c9aa7a]" strokeWidth={1.4} />
              <p className="mt-7 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#c9aa7a]">{t("event.liveStream")}</p>
              <h3 className="mt-3 font-display text-2xl">{t("event.joinRemote")}</h3>
              <p className="mt-2 text-xs leading-5 text-[#f5f2eb]/50">{t("event.streamDesc")}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs text-[#e0c79c]/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c9aa7a]" />
                {t("event.comingSoon")}
              </span>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
