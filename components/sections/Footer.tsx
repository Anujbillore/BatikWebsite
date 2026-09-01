"use client";

import { FormEvent, useState } from "react";
import { atelier } from "@/lib/data";
import { sendBrowserMail } from "@/lib/clientMail";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [note, setNote] = useState("");

  async function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not subscribe");
      if (!json.emailed) {
        try {
          const mailNote = await sendBrowserMail(
            "Dwara newsletter subscribe",
            `New subscriber on the Dwara website:\n\n${email}`,
            email
          );
          const lower = mailNote.toLowerCase();
          setNote(
            lower.includes("confirm") || lower.includes("activation")
              ? "Check billoreanuj24@gmail.com and confirm FormSubmit once. After that, every subscribe emails you."
              : "Subscribed. A note was emailed to billoreanuj24@gmail.com."
          );
        } catch {
          setNote("Subscriber saved. Confirm the FormSubmit email at billoreanuj24@gmail.com, or add Gmail SMTP in .env.local.");
        }
      } else {
        setNote(json.message);
      }
      setStatus("ok");
      setEmail("");
    } catch (err) {
      setStatus("err");
      setNote(err instanceof Error ? err.message : "Could not subscribe");
    }
  }

  return (
    <footer className="relative z-10 border-t border-ink/10 bg-paper px-5 py-16 md:px-12">
      <div className="mb-12 overflow-hidden rounded-3xl">
        <div className="relative h-48 bg-[#f3e0c8]">
          <img src="/images/batik/maroon-crackle.jpg" alt="" className="h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory" />
        </div>
      </div>
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-serif text-4xl italic text-ink">Dwara</p>
          <p className="mt-3 max-w-xs text-sm text-ink/65">{atelier.address}</p>
        </div>
        <div className="text-sm uppercase tracking-[0.18em] text-ink/75">
          <p className="mb-3 text-saffron">Menu</p>
          <a className="block py-1 hover:text-saffron" href="#home">Home</a>
          <a className="block py-1 hover:text-saffron" href="#collections">Collections</a>
          <a className="block py-1 hover:text-saffron" href="#process">How it is made</a>
          <a className="block py-1 hover:text-saffron" href="#about">About</a>
          <a className="block py-1 hover:text-saffron" href="#contact">Contact</a>
        </div>
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.18em] text-saffron">Let us get in touch</p>
          <form className="flex gap-2" onSubmit={onSubscribe}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="flex-1 rounded-full border border-ink/15 bg-white px-4 py-2 text-sm text-ink outline-none"
            />
            <button
              disabled={status === "loading"}
              className="gold-btn rounded-full px-4 py-2 text-xs uppercase tracking-[0.16em] disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Subscribe"}
            </button>
          </form>
          {status === "ok" && <p className="mt-2 text-xs text-turquoise">{note}</p>}
          {status === "err" && <p className="mt-2 text-xs text-crimson">{note}</p>}
        </div>
      </div>
      <p className="mt-12 text-[11px] uppercase tracking-[0.25em] text-ink/45">
        © {new Date().getFullYear()} Dwara Atelier · Ujjain &amp; Mhow
      </p>
    </footer>
  );
}
