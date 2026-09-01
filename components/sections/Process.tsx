"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/lib/data";

function ProcessVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hint, setHint] = useState("Hover to play");

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) setHint("Tap to play");
  }, []);

  const play = async () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = video.current;
    if (!el) return;
    try {
      el.muted = true;
      await el.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const stop = () => {
    const el = video.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    setPlaying(false);
  };

  const toggleTouch = () => {
    if (window.matchMedia("(hover: hover)").matches) return;
    if (playing) stop();
    else void play();
  };

  return (
    <div
      className="group relative mx-auto mt-14 max-w-lg overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-gold"
      onMouseEnter={() => void play()}
      onMouseLeave={stop}
      onClick={toggleTouch}
    >
      <video
        ref={video}
          className="mx-auto max-h-[55vh] w-full max-w-md object-cover md:max-h-[70vh] md:max-w-lg"
        playsInline
        muted
        loop
        preload="metadata"
        poster="/images/process/poster.jpg"
      >
        <source src="/videos/batik-procedure.mp4" type="video/mp4" />
      </video>
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/25 transition ${
          playing ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="rounded-full bg-white/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-ink">
          {hint}
        </span>
      </div>
    </div>
  );
}

export default function Process() {
  return (
    <section id="process" className="relative z-10 bg-ivory px-4 py-16 sm:px-5 sm:py-24 md:px-12">
      <p className="text-[11px] uppercase tracking-[0.4em] text-saffron">How it is made</p>
      <h2 className="mt-2 max-w-3xl font-serif text-4xl text-ink md:text-6xl">
        Wax, block, dye — then the cloth speaks.
      </h2>
      <p className="mt-4 max-w-2xl text-ink/70">
        These stills and the workshop film are from the family floor: canting, wooden blocks, and the
        finished reveal.
      </p>

      <ProcessVideo />

      <ol className="mt-16 grid gap-8 md:grid-cols-2">
        {processSteps.map((step) => (
          <li key={step.n} className="glass overflow-hidden rounded-3xl">
            <img src={step.image} alt={step.title} className="h-52 w-full object-cover sm:h-64" />
            <div className="p-5 sm:p-7">
              <p className="font-display text-sm tracking-[0.3em] text-turquoise">{step.n}</p>
              <h3 className="mt-1 font-serif text-3xl text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
