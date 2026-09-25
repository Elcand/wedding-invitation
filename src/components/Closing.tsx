"use client";

import { ArrowUpRight, Heart, MapPin, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const CHECK_IN_URL = "https://maps.google.com/?q=The+Pearl+Hotel+Jakarta";

export default function Closing() {
  return (
    <footer id="closing" data-background-video="1" className="bg-[#171815]/85 py-24 text-[#f5f2eb] sm:py-32 lg:py-40">
      <div className="section-shell">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.7fr] lg:items-end lg:gap-24">
          <div>
            <p className="eyebrow">07 / Until we meet again</p>
            <h2 className="mt-6 max-w-3xl font-display text-[clamp(4rem,10vw,9rem)] leading-[0.78] tracking-[-0.055em]">
              See you
              <br />
              <span className="italic text-[#e0c79c]">there.</span>
            </h2>
            <p className="mt-10 max-w-md text-sm leading-7 text-[#f5f2eb]/55">
              Terima kasih sudah menjadi bagian dari cerita kami. Sampai jumpa di hari yang kami nanti-nantikan bersama keluarga dan teman-teman tercinta.
            </p>
            <a href="#rsvp" className="group mt-9 inline-flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#e0c79c]">
              Konfirmasi kehadiran
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="border border-[#f5f2eb]/15 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#c9aa7a]">Check-in location</p>
                <h3 className="mt-3 font-display text-3xl">The Pearl Hotel</h3>
              </div>
              <QrCode size={19} className="text-[#c9aa7a]" strokeWidth={1.3} />
            </div>
            <div className="mt-8 flex flex-col items-center gap-5 border-y border-[#f5f2eb]/15 py-8 sm:flex-row sm:items-center">
              <div className="shrink-0 bg-[#f5f2eb] p-3">
                <QRCodeSVG
                  value={CHECK_IN_URL}
                  size={128}
                  bgColor="#f5f2eb"
                  fgColor="#171815"
                  level="M"
                  includeMargin
                />
              </div>
              <div>
                <p className="text-sm leading-6 text-[#f5f2eb]/65">Pindai QR code ini saat tiba untuk membuka lokasi acara.</p>
                <a
                  href={CHECK_IN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#e0c79c]"
                >
                  <MapPin size={14} />
                  Open maps
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between gap-4 text-[0.6rem] uppercase tracking-[0.2em] text-[#f5f2eb]/40">
              <span>Jonathan &amp; Georgia</span>
              <span>30 · 08 · 26</span>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-5 border-t border-[#f5f2eb]/15 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-[0.6rem] uppercase tracking-[0.2em] text-[#f5f2eb]/35">Made with love for our favorite people</p>
          <a href="#home" className="group inline-flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#c9aa7a]">
            Back to top
            <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
        <p className="mt-10 flex items-center justify-center gap-2 text-center font-display text-2xl italic text-[#f5f2eb]/45 sm:justify-start">
          <Heart size={15} fill="currentColor" strokeWidth={1.2} className="text-[#c9aa7a]" />
          Forever starts here
        </p>
      </div>
    </footer>
  );
}
