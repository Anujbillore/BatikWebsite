import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { saveInquiry } from "@/lib/inbox";
import { enquiryText, sendMail } from "@/lib/notify";

const InquirySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    message: String,
  },
  { timestamps: true }
);

const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);

async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return false;
  if (mongoose.connection.readyState === 1) return true;
  await mongoose.connect(uri);
  return true;
}

export async function POST(req: Request) {
  let name = "";
  let email = "";
  let phone = "";
  let message = "";
  try {
    const body = await req.json();
    name = String(body.name || "").trim();
    email = String(body.email || "").trim();
    phone = String(body.phone || "").trim();
    message = String(body.message || "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const payload = { name, email, phone, message };
  const text = enquiryText(payload);

  let stored = false;
  try {
    await saveInquiry(payload);
    stored = true;
  } catch {
    stored = false;
  }

  try {
    if (await connectDb()) {
      await Inquiry.create(payload);
      stored = true;
    }
  } catch {
    /* local inbox is enough */
  }

  let emailed = false;
  try {
    const mail = await sendMail("Dwara website enquiry", text, email);
    emailed = mail.ok;
  } catch {
    emailed = false;
  }

  return NextResponse.json({
    ok: true,
    stored,
    emailed,
    message: "Enquiry emailed to billoreanuj24@gmail.com.",
  });
}
