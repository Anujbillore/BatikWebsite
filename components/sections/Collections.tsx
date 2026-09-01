"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { batikProducts, smokeProducts, type Product } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

function Card({ item, onOpen }: { item: Product; onOpen: (p: Product) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="atelier-card group relative aspect-[3/4] overflow-hidden rounded-2xl border border-ink/10 bg-white text-left shadow-glow"
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
      ) : (
        <div className="flex h-full flex-col justify-end bg-gradient-to-br from-[#f3e0c8] via-[#e8c9a0] to-[#d7b48a] p-6">
          <div className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(circle at 50% 70%, #ea580c 0%, transparent 55%)" }} />
          <div className="absolute left-1/2 top-1/3 h-24 w-24 -translate-x-1/2 rounded-full bg-saffron/25 blur-2xl" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
      <span className="vertical-label absolute left-3 top-4 text-[10px] uppercase text-amber-200">
        {item.label}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[10px] uppercase tracking-[0.24em] text-teal-200">{item.place}</p>
        <h3 className="mt-1 font-serif text-xl text-white sm:text-2xl">{item.title}</h3>
      </div>
    </button>
  );
}

export default function Collections() {
  const [tab, setTab] = useState<"batik" | "smoke">("batik");
  const [open, setOpen] = useState<Product | null>(null);
  const section = useRef<HTMLElement>(null);
  const items = tab === "batik" ? batikProducts : smokeProducts;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.from(".atelier-heading", {
        scrollTrigger: { trigger: section.current, start: "top 80%" },
        x: reduced || window.innerWidth < 768 ? 0 : -80,
        y: window.innerWidth < 768 ? 24 : 0,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".atelier-tabs", {
        scrollTrigger: { trigger: section.current, start: "top 80%" },
        x: reduced || window.innerWidth < 768 ? 0 : 80,
        y: window.innerWidth < 768 ? 16 : 0,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".atelier-card", {
        scrollTrigger: { trigger: section.current, start: "top 72%" },
        x: reduced || window.innerWidth < 768 ? 0 : (i: number) => (i % 2 === 0 ? -160 : 160),
        y: 28,
        opacity: 0,
        duration: 0.95,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, section);
    return () => ctx.revert();
  }, [tab]);

  return (
    <section ref={section} id="collections" className="relative z-10 overflow-x-hidden bg-ivory px-4 py-16 sm:px-5 sm:py-24 md:px-12 md:py-28">
      <div className="mb-8 flex flex-col gap-5 sm:mb-10 md:flex-row md:flex-wrap md:items-end md:justify-between">
        <div className="atelier-heading">
          <p className="text-[11px] uppercase tracking-[0.4em] text-saffron">Collections</p>
          <h2 className="mt-2 font-serif text-4xl text-ink md:text-6xl">Shop the atelier</h2>
        </div>
        <div className="atelier-tabs grid w-full grid-cols-2 rounded-full border border-ink/15 bg-white p-1 sm:flex sm:w-auto">
          {(["batik", "smoke"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-3 py-2.5 text-center text-[10px] uppercase tracking-[0.12em] sm:px-5 sm:text-xs sm:tracking-[0.2em] ${
                tab === t ? "gold-btn" : "text-ink/70"
              }`}
            >
              {t === "batik" ? "Batik · Ujjain" : "Smoke · Mhow"}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Card key={item.id} item={item} onOpen={setOpen} />
        ))}
      </div>
      {tab === "smoke" && (
        <p className="mt-8 max-w-2xl text-sm text-ink/65">
          Smoking-craft pieces from Mhow are shown as living 3D forms until studio photographs arrive.
          Enquire to commission incense towers, charred teak, and brass lanterns.
        </p>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-end overflow-y-auto bg-ink/40 p-4 sm:place-items-center sm:p-6"
          onClick={() => setOpen(null)}
        >
          <article
            className="glass max-h-[88svh] w-full max-w-3xl overflow-y-auto rounded-3xl md:grid md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            {open.image ? (
              <img src={open.image} alt={open.title} className="h-52 w-full object-cover sm:h-72 md:h-full" />
            ) : (
              <div className="h-52 bg-gradient-to-br from-clay to-[#e8c9a0] sm:h-72 md:h-auto" />
            )}
            <div className="p-5 sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-saffron">
                {open.place} · {open.label}
              </p>
              <h3 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">{open.title}</h3>
              <p className="mt-4 text-ink/75">{open.note}</p>
              <a href="#contact" onClick={() => setOpen(null)} className="gold-btn mt-8 inline-block w-full rounded-full px-6 py-3 text-center text-sm uppercase tracking-[0.16em] sm:w-auto">
                Enquire about this piece
              </a>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
