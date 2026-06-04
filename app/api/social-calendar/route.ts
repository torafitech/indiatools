import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

const rateLimitMap = new Map<string, { count: number; reset: number }>();

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  if (limit && now < limit.reset && limit.count >= 5) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again in an hour." },
      { status: 429 }
    );
  }
  rateLimitMap.set(ip, {
    count: (limit && now < limit.reset ? limit.count : 0) + 1,
    reset: limit && now < limit.reset ? limit.reset : now + 3600000,
  });

  let body: {
    brand?: unknown;
    niche?: unknown;
    platforms?: unknown;
    tone?: unknown;
    days?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { brand, niche, platforms, tone, days } = body;

  if (!brand || typeof brand !== "string" || brand.length > 200) {
    return NextResponse.json({ error: "Invalid brand name" }, { status: 400 });
  }
  if (!niche || typeof niche !== "string" || niche.length > 200) {
    return NextResponse.json({ error: "Invalid niche" }, { status: 400 });
  }
  if (!Array.isArray(platforms) || platforms.length === 0) {
    return NextResponse.json({ error: "Select at least one platform" }, { status: 400 });
  }
  const validDays = [7, 14, 30];
  if (!validDays.includes(days as number)) {
    return NextResponse.json({ error: "Invalid duration" }, { status: 400 });
  }

  const msg = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 3000,
    messages: [
      {
        role: "user",
        content: `Generate a ${days}-day social media content calendar for:
Brand/Business: ${brand}
Niche: ${niche}
Platforms: ${(platforms as string[]).join(", ")}
Tone: ${typeof tone === "string" ? tone : "Professional"}

Return ONLY valid JSON array of ${days} posts:
[{"day": number, "platform": string, "contentType": string, "caption": string, "hashtags": string[], "postingTime": string, "notes": string}]

Vary platforms across all ${days} days. Content types must include a mix of: educational, promotional, engagement, story, reel, carousel, poll, quote. Posting times should vary between morning (7-9am), midday (12-2pm), and evening (6-9pm). Captions should be platform-appropriate — concise for Twitter/X, detailed for LinkedIn, casual for Instagram. Hashtags: 3-5 per post. Notes field: one practical tip about the post.`,
      },
    ],
  });

  const text = (msg.content[0] as { type: string; text: string }).text;
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    return NextResponse.json({ error: "Failed to generate calendar" }, { status: 500 });
  }

  let posts: unknown;
  try {
    posts = JSON.parse(jsonMatch[0]);
  } catch {
    return NextResponse.json({ error: "Failed to parse calendar data" }, { status: 500 });
  }

  return NextResponse.json({ posts });
}
