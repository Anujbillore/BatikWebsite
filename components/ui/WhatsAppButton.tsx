"use client";

import { meghaChatUrl } from "@/lib/data";

export default function WhatsAppButton() {
  return (
    <a
      href={meghaChatUrl()}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(37,211,102,0.45)] transition hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M12.04 2C6.5 2 2 6.36 2 11.78c0 1.73.46 3.41 1.34 4.9L2 22l5.5-1.44c1.43.78 3.04 1.2 4.54 1.2 5.54 0 10.04-4.36 10.04-9.78C22.08 6.36 17.58 2 12.04 2zm5.84 13.98c-.24.68-1.4 1.3-1.94 1.34-.5.04-1.12.06-1.8-.12-.42-.1-.95-.3-1.64-.58-2.88-1.24-4.76-4.12-4.9-4.32-.14-.18-1.16-1.54-1.16-2.94s.74-2.08 1-2.36c.24-.28.54-.34.72-.34h.52c.16 0 .4-.06.62.48.24.58.8 2 .86 2.14.08.14.12.32.02.5-.1.2-.16.32-.3.5-.14.16-.3.36-.42.48-.14.14-.3.3-.12.58.16.28.74 1.22 1.58 1.98 1.08.96 1.98 1.26 2.26 1.4.28.14.44.12.6-.06.16-.2.7-.82.88-1.1.18-.28.36-.24.6-.14.24.1 1.54.72 1.8.86.26.12.44.2.5.32.08.12.08.7-.16 1.38z" />
      </svg>
      Chat Megha
    </a>
  );
}
