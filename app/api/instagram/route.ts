import { NextResponse } from "next/server";
import { instagramPosts } from "@/lib/data";

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (token && userId) {
    const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink,thumbnail_url&access_token=${token}&limit=6`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ source: "instagram", items: data.data || [] });
    }
  }

  return NextResponse.json({
    source: "atelier",
    items: instagramPosts.map((p, i) => ({
      id: String(i),
      caption: p.caption,
      media_url: p.image,
      permalink: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com",
    })),
  });
}
