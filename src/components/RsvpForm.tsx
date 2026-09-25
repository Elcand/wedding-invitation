"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Loader2, Users } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { supabase } from "@/lib/supabase";

type Attendance = "Attending" | "Not Attending";
type Status = { type: "success" | "error"; message: string } | null;

export default function RsvpForm() {
  const { t } = useLanguage();
  const attendanceOptions: { value: Attendance; label: string; description: string }[] = [
    { value: "Attending", label: t("rsvp.attending"), description: t("rsvp.attendingDesc") },
    { value: "Not Attending", label: t("rsvp.notAttending"), description: t("rsvp.notAttendingDesc") },
  ];
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
      setStatus({ type: "error", message: t("rsvp.inactive") });
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
      setStatus({ type: "error", message: t("rsvp.error") });
      return;
    }

    setStatus({ type: "success", message: t("rsvp.success") });
    setName("");
    setAddress("");
    setGuestCount(1);

    const { default: celebrate } = await import("canvas-confetti");
    celebrate({ particleCount: 100, spread: 70, origin: { y: 0.78 } });
  };

  return (
    <section id="rsvp" data-background-video="2" className="py-24 sm:py-32 lg:py-40">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <p className="eyebrow">{t("rsvp.eyebrow")}</p>
            <h2 className="mt-5 max-w-lg font-display text-5xl leading-[0.9] tracking-[-0.04em] sm:text-7xl">
              {t("rsvp.titleTop")}
              <br />
              <span className="italic text-[#e0c79c]">{t("rsvp.titleBottom")}</span>
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-7 text-[#f5f2eb]/55">
              {t("rsvp.intro")}
            </p>
            <div className="mt-10 flex items-center gap-3 border-t border-[#f5f2eb]/15 pt-5 text-xs text-[#f5f2eb]/50">
              <Users size={16} className="text-[#c9aa7a]" strokeWidth={1.4} />
              <span>{t("rsvp.deadline")}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-10">
            <div className="flex items-center justify-between gap-4 border-b border-[#f5f2eb]/15 pb-6">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#c9aa7a]">{t("rsvp.form")}</p>
                <p className="mt-2 font-display text-2xl italic">{t("rsvp.counting")}</p>
              </div>
              <span className="font-display text-4xl italic text-[#e0c79c]/70">R.S.V.P.</span>
            </div>

            <div className="mt-8 space-y-7">
              <div>
                <label className="form-label" htmlFor="rsvp-name">
                  {t("rsvp.fullName")}
                </label>
                <input
                  id="rsvp-name"
                  className="form-control"
                  type="text"
                  placeholder={t("rsvp.namePlaceholder")}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <div>
                <label className="form-label" htmlFor="rsvp-address">
                  {t("rsvp.address")} <span className="normal-case tracking-normal text-[#f5f2eb]/35">{t("rsvp.optional")}</span>
                </label>
                <input
                  id="rsvp-address"
                  className="form-control"
                  type="text"
                  placeholder={t("rsvp.cityPlaceholder")}
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </div>

              <fieldset>
                <legend className="form-label">{t("rsvp.confirmation")}</legend>
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
                  {t("rsvp.guests")}
                </label>
                <select
                  id="rsvp-guests"
                  className="form-control"
                  value={guestCount}
                  onChange={(event) => setGuestCount(Number(event.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((count) => (
                    <option key={count} value={count}>
                      {t("rsvp.guestCount").replace("{count}", String(count))}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group mt-9 flex w-full items-center justify-center gap-3 bg-[#e0c79c] px-5 py-4 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#171815] transition-colors hover:bg-[#f0d9ad] disabled:cursor-wait disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowUpRight size={16} />}
                  {loading ? t("rsvp.sending") : t("rsvp.send")}
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
