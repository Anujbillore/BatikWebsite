"use client";

import { FormEvent, useState } from "react";
import { atelier, enquiryText } from "@/lib/data";
import { sendBrowserMail } from "@/lib/clientMail";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [note, setNote] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = {
      name: String(data.name || ""),
      email: String(data.email || ""),
      phone: String(data.phone || ""),
      message: String(data.message || ""),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not send");
      if (!json.emailed) {
        await sendBrowserMail("Dwara website enquiry", enquiryText(payload), payload.email);
      }
      setStatus("ok");
      setNote(json.message || "Enquiry emailed to billoreanuj24@gmail.com.");
      form.reset();
    } catch (err) {
      setStatus("err");
      setNote(err instanceof Error ? err.message : "Could not send the enquiry email.");
    }
  }

  return (
    <section id="contact" className="relative z-10 bg-ivory px-4 py-16 sm:px-5 sm:py-24 md:px-12">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-saffron">Contact</p>
          <h2 className="mt-2 font-serif text-4xl text-ink md:text-6xl">Write to the floor.</h2>
          <p className="mt-4 max-w-lg text-ink/70">
            Call the family, visit the Vadodara studio, or send an enquiry. It arrives by email
            at billoreanuj24@gmail.com.
          </p>

          <ul className="mt-8 space-y-4">
            {atelier.people.map((person) => (
              <li key={person.phone} className="glass rounded-2xl px-5 py-4">
                <p className="font-serif text-xl text-ink">{person.name}</p>
                <p className="text-sm text-ink/70">+91 {person.phone}</p>
              </li>
            ))}
          </ul>

          <a
            href={atelier.maps}
            target="_blank"
            rel="noreferrer"
            className="mt-6 block text-sm leading-relaxed text-ink/75 hover:text-saffron"
          >
            <span className="text-[11px] uppercase tracking-[0.22em] text-saffron">Studio</span>
            <span className="mt-1 block">{atelier.address}</span>
          </a>
        </div>
        <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-5 sm:p-7">
          <label className="block text-xs uppercase tracking-[0.2em] text-ink/60">
            Name
            <input required name="name" className="field" />
          </label>
          <label className="block text-xs uppercase tracking-[0.2em] text-ink/60">
            Email
            <input required type="email" name="email" className="field" />
          </label>
          <label className="block text-xs uppercase tracking-[0.2em] text-ink/60">
            Phone
            <input required name="phone" className="field" />
          </label>
          <label className="block text-xs uppercase tracking-[0.2em] text-ink/60">
            Message
            <textarea required name="message" rows={4} className="field" />
          </label>
          <button
            disabled={status === "loading"}
            className="gold-btn w-full rounded-full py-3 text-sm font-semibold uppercase tracking-[0.18em] disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Send enquiry"}
          </button>
          {status === "ok" && <p className="text-sm text-turquoise">{note}</p>}
          {status === "err" && <p className="text-sm text-crimson">{note}</p>}
        </form>
      </div>
    </section>
  );
}
