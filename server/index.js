require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const ENQUIRY_WHATSAPP = "917621806924";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "billoreanuj24@gmail.com";

const app = express();
app.use(cors());
app.use(express.json());

const InquirySchema = new mongoose.Schema(
  { name: String, email: String, phone: String, message: String },
  { timestamps: true }
);
const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);

function enquiryText({ name, email, phone, message }) {
  return `New Dwara enquiry\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\n\n${message}`;
}

async function sendWhatsApp(text) {
  const toE164 = "+917621806924";
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.WHATSAPP_FROM) {
    const twilio = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    await twilio.messages.create({
      from: process.env.WHATSAPP_FROM,
      to: `whatsapp:${toE164}`,
      body: text,
    });
    return true;
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
          to: ENQUIRY_WHATSAPP,
          type: "text",
          text: { body: text },
        }),
      }
    );
    if (!res.ok) throw new Error("WhatsApp Cloud API failed");
    return true;
  }
  return false;
}

async function sendMail(subject, text, replyTo) {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: NOTIFY_EMAIL,
      replyTo,
      subject,
      text,
    });
    return true;
  }
  return false;
}

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body || {};
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }
    if (process.env.MONGODB_URI) {
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(process.env.MONGODB_URI);
      }
      await Inquiry.create({ name, email, phone, message });
    }
    const text = enquiryText({ name, email, phone, message });
    try {
      await sendMail("Dwara website enquiry", text, email);
    } catch {
      /* browser FormSubmit still sends */
    }
    res.json({
      ok: true,
      emailed: true,
      message: "Enquiry emailed to billoreanuj24@gmail.com.",
    });
  } catch (err) {
    res.status(500).json({ error: "Unable to send enquiry." });
  }
});

app.post("/api/subscribe", async (req, res) => {
  try {
    const email = String((req.body || {}).email || "").trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Please enter a valid email." });
    }
    await sendMail("Dwara newsletter subscribe", `New subscriber on the Dwara website:\n\n${email}`, email);
    res.json({
      ok: true,
      message: "Subscribed. A note was emailed to billoreanuj24@gmail.com.",
    });
  } catch {
    res.status(500).json({ error: "Could not send the subscription email." });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Dwara API on http://localhost:${port}`);
});
