import { enquiryWhatsApp, notifyEmail, enquiryText } from "@/lib/data";

export { enquiryText };

export async function sendWhatsApp(text: string) {
  const toNumber = enquiryWhatsApp.replace(/\D/g, "");
  const toE164 = toNumber.startsWith("91") ? `+${toNumber}` : `+91${toNumber}`;

  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.WHATSAPP_FROM) {
    const twilio = (await import("twilio")).default;
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    await client.messages.create({
      from: process.env.WHATSAPP_FROM,
      to: `whatsapp:${toE164}`,
      body: text,
    });
    return { ok: true, via: "twilio" as const };
  }

  if (process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: toNumber,
          type: "text",
          text: { body: text },
        }),
      }
    );
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || "WhatsApp Cloud API failed");
    }
    return { ok: true, via: "meta" as const };
  }

  if (process.env.CALLMEBOT_APIKEY) {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${toNumber}&text=${encodeURIComponent(text)}&apikey=${process.env.CALLMEBOT_APIKEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("CallMeBot WhatsApp failed");
    return { ok: true, via: "callmebot" as const };
  }

  return { ok: false, via: "none" as const };
}

export async function sendMail(subject: string, text: string, replyTo?: string) {
  const to = process.env.NOTIFY_EMAIL || notifyEmail;

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const nodemailerMod = await import("nodemailer");
    const nodemailer = nodemailerMod.default ?? nodemailerMod;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      replyTo,
      subject,
      text,
    });
    return { ok: true, via: "smtp" as const };
  }

  if (process.env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "Dwara <onboarding@resend.dev>",
        to: [to],
        subject,
        text,
      }),
    });
    if (!res.ok) throw new Error("Resend email failed");
    return { ok: true, via: "resend" as const };
  }

  return { ok: false, via: "none" as const };
}
