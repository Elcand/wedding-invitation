"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Heart, Loader2, MessageCircle, Radio, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Wish = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

const initialWishes: Wish[] = [
  {
    id: "welcome-1",
    name: "The Santoso family",
    message: "Wishing you a lifetime of love, laughter, and beautiful memories.",
    created_at: "2026-08-24T09:00:00.000Z",
  },
  {
    id: "welcome-2",
    name: "Nadia & family",
    message: "So happy for you both. May your happiest days be ahead.",
    created_at: "2026-08-24T10:00:00.000Z",
  },
  {
    id: "welcome-3",
    name: "Mira",
    message: "May your love keep growing, one beautiful day at a time.",
    created_at: "2026-08-24T11:00:00.000Z",
  },
];

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" }).format(new Date(value));

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(Boolean(supabase));

  useEffect(() => {
    const client = supabase;
    if (!client) return;

    let active = true;
    const loadWishes = async () => {
      const { data, error } = await client
        .from("wishes")
        .select("id, name, message, created_at")
        .order("created_at", { ascending: false })
        .limit(12);

      if (!active) return;
      if (!error) {
        setWishes((data ?? []) as Wish[]);
        setIsLive(true);
      } else {
        setIsLive(false);
      }
    };

    void loadWishes();
    const channel = client
      .channel("wedding-wishes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "wishes" }, (payload) => {
        const incoming = payload.new as Wish;
        if (!incoming?.id) return;
        setWishes((current) => [incoming, ...current.filter((wish) => wish.id !== incoming.id)].slice(0, 12));
        setIsLive(true);
      })
      .subscribe();

    return () => {
      active = false;
      void client.removeChannel(channel);
    };
  }, []);

  const submitWish = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    const client = supabase;

    if (!client) {
      const localWish: Wish = {
        id: `local-${Date.now()}`,
        name: trimmedName,
        message: trimmedMessage,
        created_at: new Date().toISOString(),
      };
      setWishes((current) => [localWish, ...current].slice(0, 12));
      setName("");
      setMessage("");
      setLoading(false);
      setStatus("Ucapan tersimpan di perangkat ini. Terima kasih!");
      return;
    }

    const { data, error } = await client
      .from("wishes")
      .insert({ name: trimmedName, message: trimmedMessage })
      .select("id, name, message, created_at")
      .single();

    setLoading(false);

    if (error) {
      setStatus("Gagal mengirim ucapan. Silakan coba lagi.");
      return;
    }

    if (data) {
      const incoming = data as Wish;
      setWishes((current) => [incoming, ...current.filter((wish) => wish.id !== incoming.id)].slice(0, 12));
    }
    setName("");
    setMessage("");
    setStatus("Ucapan Anda sudah tiba di guestbook kami.");
  };

  return (
    <section id="wishes" className="bg-[#e7e1d5] py-24 text-[#171815] sm:py-32 lg:py-40">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow !text-[#9b7749]">06 / Digital guestbook</p>
                <h2 className="mt-5 max-w-2xl font-display text-5xl leading-[0.9] tracking-[-0.04em] sm:text-7xl">
                  Leave a little
                  <br />
                  <span className="italic text-[#9b7749]">love behind.</span>
                </h2>
              </div>
              <MessageCircle size={22} className="mb-1 hidden text-[#9b7749] sm:block" strokeWidth={1.2} />
            </div>

            <div className="mt-12 space-y-4">
              {wishes.length === 0 ? (
                <p className="border-y border-[#171815]/15 py-8 text-sm text-[#5d5a52]">Jadilah orang pertama yang meninggalkan ucapan.</p>
              ) : (
                wishes.map((wish) => (
                  <article key={wish.id} className="border-t border-[#171815]/15 py-5 first:border-t-0">
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#171815] font-display text-lg italic text-[#e0c79c]">
                          {wish.name.slice(0, 1).toUpperCase()}
                        </span>
                        <div>
                          <p className="text-sm font-semibold">{wish.name}</p>
                          <p className="mt-1 text-[0.58rem] uppercase tracking-[0.18em] text-[#8b8377]">{formatDate(wish.created_at)}</p>
                        </div>
                      </div>
                      <Heart size={15} className="mt-1 shrink-0 text-[#b88d5c]" fill="currentColor" strokeWidth={1.2} />
                    </div>
                    <p className="mt-4 pl-12 text-sm leading-7 text-[#5d5a52]">{wish.message}</p>
                  </article>
                ))
              )}
            </div>
          </div>

          <div className="lg:pt-20">
            <form onSubmit={submitWish} className="border border-[#171815]/15 bg-[#f5f2eb] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4 border-b border-[#171815]/15 pb-5">
                <div>
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#9b7749]">Write a wish</p>
                  <p className="mt-2 font-display text-2xl italic">Your words matter</p>
                </div>
                <span className="flex items-center gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#6b685f]">
                  <Radio size={13} className={isLive ? "text-[#719b76]" : "text-[#a18d77]"} strokeWidth={1.6} />
                  {isLive ? "Live" : "Preview"}
                </span>
              </div>
              <div className="mt-7 space-y-5">
                <div>
                  <label className="form-label !text-[#6b685f]" htmlFor="wish-name">
                    Nama Anda
                  </label>
                  <input
                    id="wish-name"
                    className="form-control !border-[#171815]/20 !bg-transparent !text-[#171815] placeholder:!text-[#171815]/35"
                    type="text"
                    placeholder="Nama atau nama keluarga"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="form-label !text-[#6b685f]" htmlFor="wish-message">
                    Ucapan
                  </label>
                  <textarea
                    id="wish-message"
                    className="form-control min-h-32 resize-y !border-[#171815]/20 !bg-transparent !text-[#171815] placeholder:!text-[#171815]/35"
                    placeholder="Tulis pesan untuk Jonathan & Georgia"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="group mt-7 flex w-full items-center justify-center gap-3 bg-[#171815] px-5 py-4 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#f5f2eb] transition-colors hover:bg-[#9b7749] disabled:cursor-wait disabled:opacity-60"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
                {loading ? "Mengirim" : "Send a wish"}
              </button>
              {status && <p className="mt-4 text-center text-xs text-[#6b685f]" role="status">{status}</p>}
            </form>
            <p className="mt-5 text-center text-[0.62rem] leading-5 text-[#6b685f]">Ucapan akan tampil langsung di guestbook digital kami.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
