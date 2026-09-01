"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#collections", label: "Collections" },
  { href: "#process", label: "Journey" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDark = !solid;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        solid ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span
            className={`grid h-9 w-9 place-items-center rounded-full border text-[10px] tracking-[0.2em] ${
              onDark ? "border-amber-300/70 text-amber-300" : "border-saffron/50 text-saffron"
            }`}
          >
            D
          </span>
          <span className={`font-serif text-2xl italic ${onDark ? "text-white" : "text-ink"}`}>Dwara</span>
        </a>
        <nav
          className={`hidden items-center gap-7 text-[11px] uppercase tracking-[0.22em] md:flex ${
            onDark ? "text-white/85" : "text-ink/80"
          }`}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-amber-300">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="gold-btn rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
          >
            Enquire
          </a>
          <button
            type="button"
            className={`grid h-10 w-10 place-items-center rounded-full border md:hidden ${
              onDark ? "border-white/30" : "border-ink/20"
            }`}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`block h-3 w-4 border-y ${onDark ? "border-white" : "border-ink"}`} />
          </button>
        </div>
      </div>
      {open && (
        <nav className="glass mx-5 mt-3 flex flex-col rounded-2xl p-4 text-sm uppercase tracking-[0.2em] text-ink md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="py-3" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
