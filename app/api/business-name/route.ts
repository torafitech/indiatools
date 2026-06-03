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

  let body: { description?: unknown; industry?: unknown; style?: unknown; values?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { description, industry, style, values } = body;

  if (!description || typeof description !== "string" || description.length > 500) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Generate 10 creative, memorable business names for this business:

Business Description: ${description}
Industry: ${typeof industry === "string" ? industry : "General"}
Brand Style: ${typeof style === "string" ? style : "Modern"}
Brand Values: ${typeof values === "string" ? values : "Not specified"}

Requirements:
- Mix of different styles: invented words, descriptive, metaphorical, acronyms
- Easy to pronounce and remember
- Consider Indian market context
- Avoid generic/overused words like "Tech", "Solutions", "Services" unless creative
- Each name should be 1-3 words max

Return ONLY a JSON array of 10 objects, no other text:
[{"name": "BrandName", "tagline": "One-line tagline", "why": "1 sentence on why this works"}]`,
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";

  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    return NextResponse.json({ error: "Failed to generate names" }, { status: 500 });
  }

  let names: unknown;
  try {
    names = JSON.parse(jsonMatch[0]);
  } catch {
    return NextResponse.json({ error: "Failed to parse generated names" }, { status: 500 });
  }

  return NextResponse.json({ names });
}
