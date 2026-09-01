import { NextResponse } from "next/server";
import { saveSubscriber } from "@/lib/inbox";
import { sendMail } from "@/lib/notify";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    await saveSubscriber(email);

    let emailed = false;
    try {
      const mail = await sendMail(
        "Dwara newsletter subscribe",
        `New subscriber on the Dwara website:\n\n${email}`,
        email
      );
      emailed = mail.ok;
    } catch {
      emailed = false;
    }

    return NextResponse.json({
      ok: true,
      emailed,
      message: emailed
        ? "Subscribed. A note was emailed to billoreanuj24@gmail.com."
        : "Subscriber saved. Sending email now.",
    });
  } catch {
    return NextResponse.json({ error: "Could not subscribe." }, { status: 500 });
  }
}
