'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center text-stone-800">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="space-y-4"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
          The Wedding of
        </p>
        <h1 className="font-serif text-4xl tracking-wide md:text-6xl">
          JONATHAN & GEORGIA
        </h1>
        <p className="text-sm tracking-widest text-stone-600">30 . 08 . 26</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-10 max-w-sm text-center font-serif text-xs italic leading-relaxed text-stone-600"
      >
        “Where you go I will go, and where you stay I will stay. Your people
        will be my people and your God my God.”
        <span className="block not-italic mt-1 text-[10px] uppercase tracking-widest text-stone-400">
          Ruth 1:16-17
        </span>
      </motion.div>
    </section>
  );
}