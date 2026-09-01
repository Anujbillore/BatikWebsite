"use client";

import { campaigns, instagramPosts } from "@/lib/data";

export default function About() {
  const ig = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com";

  return (
    <section id="about" className="relative z-10 bg-ivory px-5 py-24 md:px-12">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-saffron">About us</p>
          <h2 className="mt-2 font-serif text-4xl text-ink md:text-6xl">A doorway between two workshops.</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/75">
            Dwara is a family business. In Ujjain, cloth is waxed, stamped, and dyed until batik
            crackle appears — the veining no machine can fake. In Mhow, wood is smoked, incense is
            coiled, and brass is pierced so fragrance becomes light.
          </p>
          <p className="mt-4 text-ink/65">
            Two towns in Madhya Pradesh. One lineage of making. Pieces leave the floor numbered,
            photographed, and ready to be stitched or placed on an altar.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <article className="glass rounded-3xl p-8">
            <p className="text-turquoise">01</p>
            <h3 className="mt-2 font-serif text-3xl text-ink">Ujjain</h3>
            <p className="mt-3 text-sm text-ink/70">
              Batik tulis and block batik. Unstitched suits, shawls, and dupattas in saffron,
              crimson, teal, and maroon.
            </p>
          </article>
          <article className="glass rounded-3xl p-8">
            <p className="text-saffron">02</p>
            <h3 className="mt-2 font-serif text-3xl text-ink">Mhow</h3>
            <p className="mt-3 text-sm text-ink/70">
              Smoking craft — incense architecture, charred teak, and lanterns that turn smoke into
              gold.
            </p>
          </article>
        </div>
      </div>

      <div className="mt-24">
        <div className="mb-8 flex items-end justify-between">
          <h3 className="font-serif text-3xl text-ink md:text-5xl">Atelier diary</h3>
          <a
            href={ig}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-saffron/50 bg-white px-5 py-2 text-xs uppercase tracking-[0.2em] text-saffron transition hover:bg-saffron hover:text-white"
          >
            Follow us
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {instagramPosts.map((p) => (
            <a key={p.caption} href={ig} target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden rounded-2xl">
              <img src={p.image} alt={p.caption} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              <span className="absolute inset-0 grid place-items-end bg-ink/0 p-3 text-xs text-white opacity-0 transition group-hover:bg-ink/50 group-hover:opacity-100">
                {p.caption}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-24">
        <p className="text-[11px] uppercase tracking-[0.4em] text-saffron">Campaign concepts</p>
        <h3 className="mt-2 font-serif text-3xl text-ink md:text-5xl">How we would take this to film.</h3>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {campaigns.map((c) => (
            <article key={c.title} className="glass rounded-3xl p-7">
              <p className="text-[11px] uppercase tracking-[0.25em] text-turquoise">{c.format}</p>
              <h4 className="mt-3 font-serif text-2xl text-ink">{c.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{c.idea}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
