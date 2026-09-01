"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pointer, scrollProgress, heroProgress } from "@/lib/store";
import Loader from "@/components/ui/Loader";
import Cursor from "@/components/ui/Cursor";
import Navbar from "@/components/ui/Navbar";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Hero from "@/components/sections/Hero";
import Collections from "@/components/sections/Collections";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const Scene = dynamic(() => import("@/components/experience/Scene"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

export default function HomeClient() {
  const onLoaded = useCallback(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  useEffect(() => {
    const mobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    let lenis: Lenis | null = null;
    let onRaf: ((time: number) => void) | null = null;

    const measure = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.value = h > 0 ? window.scrollY / h : 0;
      const hero = document.getElementById("home");
      const heroH = hero?.offsetHeight || window.innerHeight;
      heroProgress.value = Math.min(1, Math.max(0, window.scrollY / Math.max(1, heroH * 0.92)));
    };

    if (!mobile) {
      lenis = new Lenis({ lerp: 0.08 });
      lenis.on("scroll", ScrollTrigger.update);
      lenis.on("scroll", measure);
      onRaf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(onRaf);
    } else {
      window.addEventListener("scroll", measure, { passive: true });
      window.addEventListener("scroll", ScrollTrigger.update, { passive: true });
    }
    measure();

    const onMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      pointer.touching = true;
      pointer.x = (t.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(t.clientY / window.innerHeight) * 2 + 1;
    };
    const onTouchEnd = () => {
      pointer.touching = false;
    };
    const onOrient = (e: DeviceOrientationEvent) => {
      if (pointer.touching || e.gamma == null) return;
      pointer.x = Math.max(-1, Math.min(1, e.gamma / 22));
      if (e.beta != null) pointer.y = Math.max(-1, Math.min(1, (45 - e.beta) / 28));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("deviceorientation", onOrient);

    const ctx = gsap.context(() => {
      if (mobile) return;
      gsap.utils.toArray<HTMLElement>("#process, #about, #contact").forEach((el) => {
        gsap.from(el.children, {
          scrollTrigger: { trigger: el, start: "top 82%" },
          y: 36,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("orientationchange", refresh);
    window.addEventListener("load", refresh);

    return () => {
      ctx.revert();
      if (onRaf) gsap.ticker.remove(onRaf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("deviceorientation", onOrient);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("scroll", ScrollTrigger.update);
      window.removeEventListener("orientationchange", refresh);
      window.removeEventListener("load", refresh);
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <Loader onDone={onLoaded} />
      <Cursor />
      <Navbar />
      <div className="canvas-fixed">
        <Scene />
      </div>
      <div className="relative z-10 overflow-x-hidden">
        <Hero />
        <div className="overflow-hidden border-y border-saffron/20 bg-saffron py-3 text-white">
          <div className="marquee-track flex w-max gap-10 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-xs sm:tracking-[0.35em]">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i}>Hand-dyed in Ujjain · Smoked in Mhow · No two pieces alike ·</span>
            ))}
          </div>
        </div>
        <div className="bg-ivory">
          <Collections />
          <Process />
          <About />
          <Contact />
          <Footer />
        </div>
      </div>
      <WhatsAppButton />
    </>
  );
}
