"use client";

import { brand } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-end px-4 pb-20 pt-28 sm:px-5 md:px-12 md:pb-24 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/28 via-transparent to-ivory" />
      <p className="relative mb-4 max-w-[20rem] text-[10px] uppercase leading-relaxed tracking-[0.18em] text-amber-300 sm:max-w-none sm:text-[11px] sm:tracking-[0.32em] md:tracking-[0.48em]">
        Batik · Ujjain &nbsp;|&nbsp; Smoking craft · Mhow
      </p>
      <h1 className="relative max-w-5xl font-serif text-[2.6rem] leading-[1.02] text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)] sm:text-5xl md:text-8xl md:leading-[0.95]">
        Liquid colour,
        <span className="italic text-amber-300"> slow poured</span>
        <span className="block text-teal-300">on cloth.</span>
      </h1>
      <p className="relative mt-5 max-w-xl text-[15px] leading-relaxed text-white/90 drop-shadow sm:mt-6 sm:text-base md:text-lg">
        A family atelier. Wax, block, dye, and crackle in Ujjain. Smoke, teak, and incense in Mhow.
        {` ${brand.tagline}`}
      </p>
      <div className="relative mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:max-w-xl sm:flex-row sm:flex-wrap sm:items-center">
        <a
          href="#contact"
          className="gold-btn w-full rounded-full px-6 py-3.5 text-center text-sm font-semibold uppercase tracking-[0.12em] sm:w-auto sm:px-7 sm:tracking-[0.16em]"
        >
          {brand.cta}
        </a>
        <a
          href="#collections"
          className="w-full rounded-full border border-white/50 bg-white/10 px-6 py-3.5 text-center text-sm uppercase tracking-[0.12em] text-white backdrop-blur-sm hover:border-amber-300 sm:w-auto sm:px-7 sm:tracking-[0.16em]"
        >
          View collections
        </a>
      </div>
      <p className="relative mt-10 text-[10px] uppercase tracking-[0.28em] text-white/60 sm:mt-16 sm:tracking-[0.5em]">
        Scroll the journey
      </p>
    </section>
  );
}
