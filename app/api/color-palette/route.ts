import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

const rateLimitMap = new Map<string, { count: number; reset: number }>();

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  if (limit && now < limit.reset && limit.count >= 10) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again in an hour." },
      { status: 429 }
    );
  }
  rateLimitMap.set(ip, {
    count: (limit && now < limit.reset ? limit.count : 0) + 1,
    reset: limit && now < limit.reset ? limit.reset : now + 3600000,
  });

  let body: { description?: unknown; mode?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { description } = body;

  if (!description || typeof description !== "string" || description.length > 500) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const msg = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 800,
    messages: [
      {
        role: "user",
        content: `Generate a professional 5-color brand palette for: "${description}". Return ONLY valid JSON array of 5 colors: [{name: string, hex: string, usage: string, rgb: {r: number, g: number, b: number}}]. Ensure colors work well together and are accessible. Include: primary, secondary, accent, background, text colors.`,
      },
    ],
  });

  const text = (msg.content[0] as { type: string; text: string }).text;
  const jsonMatch = text.match(/\[[\s\S]*\]/);

  if (!jsonMatch) {
    return NextResponse.json({ error: "Failed to generate palette" }, { status: 500 });
  }

  let colors: unknown;
  try {
    colors = JSON.parse(jsonMatch[0]);
  } catch {
    return NextResponse.json({ error: "Failed to parse palette" }, { status: 500 });
  }

  return NextResponse.json({ colors });
}
