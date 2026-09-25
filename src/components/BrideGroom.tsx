import Image from "next/image";
import { ArrowUpRight, AtSign } from "lucide-react";

const couple = [
  {
    name: "Jonathan Timothy",
    role: "The Groom",
    description: "Bertanggung jawab, hangat, dan selalu punya cerita menarik untuk dibagi.",
    parents: "Putra dari Mr. & Mrs. Santoso",
    image: "/assets/photos/photo-placehoder1.jpg",
    alt: "Jonathan dan Georgia berfoto di taman",
    position: "object-[32%_32%]",
  },
  {
    name: "Georgia Audrey",
    role: "The Bride",
    description: "Ceria, penuh cahaya, dan membuat setiap hari terasa lebih indah.",
    parents: "Putri dari Mr. & Mrs. Hartono",
    image: "/assets/photos/photo-placeholder2.jpg",
    alt: "Jonathan dan Georgia dalam balutan pernikahan",
    position: "object-[64%_48%]",
  },
];

export default function BrideGroom() {
  return (
    <section id="couple" data-background-video="1" className="bg-[#f5f2eb]/80 py-24 text-[#171815] sm:py-32 lg:py-40">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="eyebrow !text-[#9b7749]">01 / The couple</p>
            <h2 className="mt-5 max-w-xl font-display text-5xl leading-[0.9] tracking-[-0.04em] sm:text-7xl">
              Dua hati,
              <br />
              <span className="italic text-[#9b7749]">satu cerita.</span>
            </h2>
          </div>
          <p className="max-w-md justify-self-start text-sm leading-7 text-[#5d5a52] lg:justify-self-end">
            Kami adalah dua orang yang jatuh cinta pada momen-momen kecil, lalu memilih untuk merayakan setiap langkah bersama.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-6 lg:mt-24 lg:gap-10">
          {couple.map((person, index) => (
            <article key={person.role} className={index === 1 ? "md:mt-24" : ""}>
              <div className="image-frame aspect-[4/5]">
                <Image
                  src={person.image}
                  alt={person.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover ${person.position}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171815]/75 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-[#f5f2eb]/80">
                  {person.role}
                </span>
                <span className="absolute bottom-5 right-5 font-display text-5xl italic text-[#e0c79c]/90">
                  0{index + 1}
                </span>
              </div>
              <div className="flex items-start justify-between gap-5 border-b border-[#171815]/15 py-6">
                <div>
                  <h3 className="font-display text-3xl tracking-[-0.02em] sm:text-4xl">{person.name}</h3>
                  <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#8b6a43]">
                    {person.parents}
                  </p>
                </div>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Instagram ${person.name}`}
                  className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#171815]/20 transition-colors hover:border-[#9b7749] hover:text-[#9b7749]"
                >
                  <AtSign size={15} strokeWidth={1.5} />
                </a>
              </div>
              <p className="max-w-sm pt-5 text-sm leading-7 text-[#5d5a52]">{person.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-[#171815]/15 pt-6 sm:flex-row sm:items-center">
          <p className="font-display text-2xl italic text-[#9b7749]">Together with their families</p>
          <a href="#story" className="line-link !text-[#9b7749]">
            Read our story
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
