import { notifyEmail } from "@/lib/data";

export function formSubmitEndpoint(to = notifyEmail) {
  return `https://formsubmit.co/ajax/${encodeURIComponent(to)}`;
}

export async function sendBrowserMail(subject: string, message: string, replyTo?: string) {
  const ctrl = new AbortController();
  const timer = window.setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(formSubmitEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: ctrl.signal,
      body: JSON.stringify({
        _subject: subject,
        _template: "table",
        _captcha: false,
        email: replyTo || notifyEmail,
        message,
      }),
    });
    const json = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
    const ok = res.ok && json?.success !== "false" && json?.success !== false;
    if (!ok) throw new Error(json?.message || "Could not send email");
    return json?.message || "Email sent.";
  } finally {
    window.clearTimeout(timer);
  }
}
