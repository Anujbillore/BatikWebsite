"use client";

import { brand } from "@/lib/data";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-end px-5 pb-24 pt-32 md:px-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-ivory" />
      <p className="relative mb-4 text-[11px] uppercase tracking-[0.48em] text-amber-300">
        Batik · Ujjain &nbsp;|&nbsp; Smoking craft · Mhow
      </p>
      <h1 className="relative max-w-5xl font-serif text-5xl leading-[0.95] text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)] md:text-8xl">
        Liquid colour,
        <span className="italic text-amber-300"> slow poured</span>
        <span className="block text-teal-300">on cloth.</span>
      </h1>
      <p className="relative mt-6 max-w-xl text-base leading-relaxed text-white/90 drop-shadow md:text-lg">
        A family atelier. Wax, block, dye, and crackle in Ujjain. Smoke, teak, and incense in Mhow.
        {` ${brand.tagline}`}
      </p>
      <div className="relative mt-10 flex flex-wrap items-center gap-4">
        <a
          href="#contact"
          className="gold-btn rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em]"
        >
          {brand.cta}
        </a>
        <a
          href="#collections"
          className="rounded-full border border-white/50 bg-white/10 px-7 py-3 text-sm uppercase tracking-[0.16em] text-white backdrop-blur-sm hover:border-amber-300"
        >
          View collections
        </a>
      </div>
      <p className="relative mt-16 text-[10px] uppercase tracking-[0.5em] text-white/60">
        Scroll the journey
      </p>
    </section>
  );
}
