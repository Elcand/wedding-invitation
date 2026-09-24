'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import confetti from 'canvas-confetti';

export default function RsvpForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [attendance, setAttendance] = useState('Attending');
  const [guestCount, setGuestCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg('');

    const { error } = await supabase.from('rsvp').insert([
      {
        name,
        address,
        attendance,
        guest_count: guestCount,
      },
    ]);

    setLoading(false);

    if (error) {
      setStatusMsg('Gagal mengirim konfirmasi. Silakan coba lagi.');
    } else {
      setStatusMsg('Terima kasih! Konfirmasi Anda telah terkirim.');
      setName('');
      setAddress('');
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
    }
  };

  return (
    <section className="mx-auto max-w-md px-6 py-16 text-stone-800">
      <h2 className="mb-2 text-center font-serif text-2xl tracking-wide uppercase">
        RSVP Form
      </h2>
      <p className="mb-8 text-center text-xs text-stone-500">
        Mohon konfirmasi kehadiran Anda untuk membantu persiapan kami.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block mb-1 tracking-wider uppercase text-stone-600">
            Nama Lengkap
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-stone-300 bg-transparent px-3 py-2 outline-none focus:border-stone-800"
          />
        </div>

        <div>
          <label className="block mb-1 tracking-wider uppercase text-stone-600">
            Alamat / Kota
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-stone-300 bg-transparent px-3 py-2 outline-none focus:border-stone-800"
          />
        </div>

        <div>
          <label className="block mb-1 tracking-wider uppercase text-stone-600">
            Konfirmasi Kehadiran
          </label>
          <select
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            className="w-full border border-stone-300 bg-transparent px-3 py-2 outline-none focus:border-stone-800"
          >
            <option value="Attending">Hadir</option>
            <option value="Not Attending">Tidak Dapat Hadir</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 tracking-wider uppercase text-stone-600">
            Jumlah Tamu
          </label>
          <input
            type="number"
            min="1"
            max="5"
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="w-full border border-stone-300 bg-transparent px-3 py-2 outline-none focus:border-stone-800"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-stone-900 py-3 tracking-widest text-stone-100 uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Mengirim...' : 'Submit'}
        </button>

        {statusMsg && (
          <p className="mt-4 text-center text-xs font-medium text-stone-700">
            {statusMsg}
          </p>
        )}
      </form>
    </section>
  );
}