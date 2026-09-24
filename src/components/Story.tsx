import Image from "next/image";
import { ArrowUpRight, Heart } from "lucide-react";

const milestones = [
  {
    year: "2019",
    title: "First meeting",
    text: "Di sebuah kedai kopi kecil, kami menemukan bahwa obrolan yang ringan dapat menjadi awal cerita yang panjang.",
  },
  {
    year: "2022",
    title: "Two become one",
    text: "Berbagi tawa, cerita, dan banyak perjalanan kecil. Setiap petualangan membuat kami semakin yakin memilih satu sama lain.",
  },
  {
    year: "2026",
    title: "New journey",
    text: "Kini kami siap menulis bab baru: hidup berdua, berbagi semangat, dan merayakan cinta bersama keluarga.",
  },
];

export default function Story() {
  return (
    <section id="story" className="bg-[#e7e1d5] py-24 text-[#171815] sm:py-32 lg:py-40">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <p className="eyebrow !text-[#9b7749]">03 / The love journey</p>
            <h2 className="mt-5 max-w-md font-display text-5xl leading-[0.9] tracking-[-0.04em] sm:text-7xl">
              Love, in
              <br />
              <span className="italic text-[#9b7749]">every chapter.</span>
            </h2>
            <div className="mt-10 flex items-center gap-3 text-[#9b7749]">
              <Heart size={17} fill="currentColor" strokeWidth={1.2} />
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em]">Since 2019</span>
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
                      <h3 className="mt-3 font-display text-4xl tracking-[-0.02em] sm:text-5xl">{milestone.title}</h3>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-[#5d5a52]">{milestone.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="image-frame mt-16 aspect-[16/10] sm:ml-[4.2rem] sm:mt-24">
              <Image
                src="/assets/photos/photo-placeholder2.jpg"
                alt="Jonathan dan Georgia merayakan cinta mereka"
                fill
                sizes="(max-width: 640px) 100vw, 75vw"
                className="object-cover object-[50%_38%] grayscale-[15%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171815]/50 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 max-w-[13rem] font-display text-2xl italic leading-none text-[#f5f2eb] sm:bottom-8 sm:left-8">
                The best is yet to come.
              </p>
            </div>
          </div>
        </div>

        <a href="#gallery" className="group mt-16 flex items-center justify-between border-t border-[#171815]/15 pt-6 text-[#9b7749] sm:mt-24">
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em]">See more of us</span>
          <ArrowUpRight size={19} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
    </section>
  );
}
