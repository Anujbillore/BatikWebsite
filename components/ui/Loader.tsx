"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setGone(true);
        onDone();
      },
    });
    tl.to(".loader-bar", { scaleX: 1, duration: 1.6, ease: "power3.inOut" })
      .to(".loader-title", { y: 0, opacity: 1, duration: 0.7 }, 0.2)
      .to(".loader-sub", { opacity: 1, duration: 0.5 }, 0.5)
      .to(".loader-root", { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, 1.85);
  }, [onDone]);

  if (gone) return null;

  return (
    <div className="loader-root fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ivory crackle">
      <p className="loader-sub mb-4 text-[11px] uppercase tracking-[0.5em] text-saffron opacity-0">
        Ujjain · Mhow
      </p>
      <h1 className="loader-title font-serif text-5xl italic tracking-tight text-ink opacity-0 translate-y-8 md:text-8xl">
        Dwara
      </h1>
      <div className="mt-10 h-[2px] w-48 overflow-hidden bg-ink/10">
        <div className="loader-bar h-full origin-left scale-x-0 bg-gradient-to-r from-turquoise via-gold to-saffron" />
      </div>
    </div>
  );
}
