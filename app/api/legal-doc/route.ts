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

  let body: { docType?: unknown; fields?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { docType, fields } = body;

  if (!docType || typeof docType !== "string" || !fields || typeof fields !== "object") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const msg = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `Generate a professional ${docType} for India. Use these details: ${JSON.stringify(fields)}. Format as a clean legal document with proper sections, THIS AGREEMENT, WHEREAS clauses, numbered sections. Include standard Indian legal boilerplate. Return the document text only, no JSON wrapper.`,
      },
    ],
  });

  const text = (msg.content[0] as { type: string; text: string }).text;
  return NextResponse.json({ document: text });
}
