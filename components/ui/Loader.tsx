"use client";

import { useEffect, useState } from "react";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [gone, setGone] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setLeaving(true);
      window.setTimeout(() => {
        setGone(true);
        onDone();
      }, 500);
    };

    const show = window.setTimeout(finish, 1600);
    const failsafe = window.setTimeout(finish, 2800);
    const onKick = () => finish();
    window.addEventListener("touchstart", onKick, { once: true, passive: true });
    window.addEventListener("pointerdown", onKick, { once: true });

    return () => {
      window.clearTimeout(show);
      window.clearTimeout(failsafe);
      window.removeEventListener("touchstart", onKick);
      window.removeEventListener("pointerdown", onKick);
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div
      className={`loader-root fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ivory crackle transition-transform duration-500 ease-in-out ${
        leaving ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <p className="mb-4 animate-[fadeIn_0.6s_ease_0.2s_forwards] text-[11px] uppercase tracking-[0.5em] text-saffron opacity-0">
        Ujjain · Mhow
      </p>
      <h1 className="animate-[riseIn_0.7s_ease_0.15s_forwards] font-serif text-5xl italic tracking-tight text-ink opacity-0 translate-y-8 md:text-8xl">
        Dwara
      </h1>
      <div className="mt-10 h-[2px] w-48 overflow-hidden bg-ink/10">
        <div className="h-full origin-left animate-[loadBar_1.4s_ease-in-out_forwards] scale-x-0 bg-gradient-to-r from-turquoise via-gold to-saffron" />
      </div>
    </div>
  );
}
