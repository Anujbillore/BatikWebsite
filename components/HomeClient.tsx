"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pointer, scrollProgress } from "@/lib/store";
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

export default function HomeClient() {
  const [ready, setReady] = useState(false);
  const onLoaded = useCallback(() => setReady(true), []);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 });
    lenis.on("scroll", ScrollTrigger.update);
    const onRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    const measure = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.value = h > 0 ? window.scrollY / h : 0;
    };
    lenis.on("scroll", measure);
    measure();

    const onMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);

    const ctx = gsap.context(() => {
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

    return () => {
      ctx.revert();
      gsap.ticker.remove(onRaf);
      window.removeEventListener("mousemove", onMove);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Loader onDone={onLoaded} />
      <Cursor />
      <Navbar />
      <div className="canvas-fixed">{ready ? <Scene /> : null}</div>
      <div className="relative z-10">
        <Hero />
        <div className="overflow-hidden border-y border-saffron/20 bg-saffron py-3 text-white">
          <div className="marquee-track flex w-max gap-10 text-xs font-semibold uppercase tracking-[0.35em]">
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
