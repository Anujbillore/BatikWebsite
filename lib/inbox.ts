import { promises as fs } from "fs";
import path from "path";

const file = path.join(process.cwd(), "data", "inbox.json");

type Inbox = {
  inquiries: Array<Record<string, string>>;
  subscribers: Array<Record<string, string>>;
};

async function readInbox(): Promise<Inbox> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as Inbox;
  } catch {
    return { inquiries: [], subscribers: [] };
  }
}

async function writeInbox(inbox: Inbox) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(inbox, null, 2));
}

export async function saveInquiry(row: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const inbox = await readInbox();
  inbox.inquiries.unshift({ ...row, at: new Date().toISOString() });
  await writeInbox(inbox);
}

export async function saveSubscriber(email: string) {
  const inbox = await readInbox();
  inbox.subscribers.unshift({ email, at: new Date().toISOString() });
  await writeInbox(inbox);
}
