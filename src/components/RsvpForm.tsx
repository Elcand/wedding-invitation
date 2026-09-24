"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Loader2, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Attendance = "Attending" | "Not Attending";
type Status = { type: "success" | "error"; message: string } | null;

const attendanceOptions: { value: Attendance; label: string; description: string }[] = [
  { value: "Attending", label: "Saya hadir", description: "Saya tidak akan melewatkan hari besar ini." },
  { value: "Not Attending", label: "Maaf, tidak hadir", description: "Doakan saya dari jauh." },
];

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("Attending");
  const [guestCount, setGuestCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    const client = supabase;
    if (!client) {
      setLoading(false);
      setStatus({ type: "error", message: "RSVP belum aktif. Hubungi kami jika Anda membutuhkan bantuan." });
      return;
    }

    const { error } = await client.from("rsvp").insert([
      {
        name: name.trim(),
        address: address.trim() || null,
        attendance,
        guest_count: guestCount,
      },
    ]);

    setLoading(false);

    if (error) {
      setStatus({ type: "error", message: "Gagal mengirim konfirmasi. Silakan coba beberapa saat lagi." });
      return;
    }

    setStatus({ type: "success", message: "Terima kasih! Konfirmasi kehadiran Anda telah kami terima." });
    setName("");
    setAddress("");
    setGuestCount(1);

    const { default: celebrate } = await import("canvas-confetti");
    celebrate({ particleCount: 100, spread: 70, origin: { y: 0.78 } });
  };

  return (
    <section id="rsvp" className="bg-[#20211d] py-24 sm:py-32 lg:py-40">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <p className="eyebrow">05 / Save your seat</p>
            <h2 className="mt-5 max-w-lg font-display text-5xl leading-[0.9] tracking-[-0.04em] sm:text-7xl">
              Will you
              <br />
              <span className="italic text-[#e0c79c]">join us?</span>
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-7 text-[#f5f2eb]/55">
              Kehadiran Anda sangat berarti bagi kami. Mohon isi formulir ini agar kami dapat menyiapkan tempat yang terbaik untuk Anda.
            </p>
            <div className="mt-10 flex items-center gap-3 border-t border-[#f5f2eb]/15 pt-5 text-xs text-[#f5f2eb]/50">
              <Users size={16} className="text-[#c9aa7a]" strokeWidth={1.4} />
              <span>Batas hingga 15 Agustus 2026</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-10">
            <div className="flex items-center justify-between gap-4 border-b border-[#f5f2eb]/15 pb-6">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#c9aa7a]">RSVP form</p>
                <p className="mt-2 font-display text-2xl italic">We are counting on you</p>
              </div>
              <span className="font-display text-4xl italic text-[#e0c79c]/70">R.S.V.P.</span>
            </div>

            <div className="mt-8 space-y-7">
              <div>
                <label className="form-label" htmlFor="rsvp-name">
                  Nama lengkap
                </label>
                <input
                  id="rsvp-name"
                  className="form-control"
                  type="text"
                  placeholder="Tulis nama Anda"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <div>
                <label className="form-label" htmlFor="rsvp-address">
                  Alamat / kota <span className="normal-case tracking-normal text-[#f5f2eb]/35">(opsional)</span>
                </label>
                <input
                  id="rsvp-address"
                  className="form-control"
                  type="text"
                  placeholder="Dari kota mana Anda datang?"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </div>

              <fieldset>
                <legend className="form-label">Konfirmasi kehadiran</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {attendanceOptions.map((option) => {
                    const selected = attendance === option.value;
                    return (
                      <label
                        key={option.value}
                        className={`relative cursor-pointer border p-4 transition-colors ${
                          selected
                            ? "border-[#c9aa7a] bg-[#c9aa7a]/10"
                            : "border-[#f5f2eb]/15 hover:border-[#f5f2eb]/35"
                        }`}
                      >
                        <input
                          className="sr-only"
                          type="radio"
                          name="attendance"
                          value={option.value}
                          checked={selected}
                          onChange={() => setAttendance(option.value)}
                        />
                        <span className="flex items-center justify-between gap-3 text-sm text-[#f5f2eb]">
                          {option.label}
                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                              selected ? "border-[#c9aa7a] bg-[#c9aa7a] text-[#171815]" : "border-[#f5f2eb]/30"
                            }`}
                          >
                            {selected && <Check size={12} strokeWidth={3} />}
                          </span>
                        </span>
                        <span className="mt-2 block text-xs leading-5 text-[#f5f2eb]/45">{option.description}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div>
                <label className="form-label" htmlFor="rsvp-guests">
                  Jumlah tamu
                </label>
                <select
                  id="rsvp-guests"
                  className="form-control"
                  value={guestCount}
                  onChange={(event) => setGuestCount(Number(event.target.value))}
                >
                  <option value={1}>1 orang</option>
                  <option value={2}>2 orang</option>
                  <option value={3}>3 orang</option>
                  <option value={4}>4 orang</option>
                  <option value={5}>5 orang</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group mt-9 flex w-full items-center justify-center gap-3 bg-[#e0c79c] px-5 py-4 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#171815] transition-colors hover:bg-[#f0d9ad] disabled:cursor-wait disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowUpRight size={16} />}
              {loading ? "Mengirim konfirmasi" : "Kirim konfirmasi"}
            </button>

            {status && (
              <p
                role="status"
                className={`mt-5 text-center text-xs leading-5 ${status.type === "success" ? "text-[#b9d5b4]" : "text-[#e2a59a]"}`}
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
