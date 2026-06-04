import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: Request) {
  const { subject } = await req.json();

  if (!subject || typeof subject !== "string" || subject.length > 150) {
    return Response.json({ error: "Invalid subject line" }, { status: 400 });
  }

  const client = new Anthropic();
  const msg = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 800,
    messages: [
      {
        role: "user",
        content: `Analyze this email subject line for open rate potential. Return ONLY valid JSON with these exact keys:
- score: number 0-100
- openRatePrediction: string like "18-22%"
- explanation: string, 1-2 sentences on why this score
- alternatives: array of exactly 5 improved subject line strings

Subject line: "${subject}"`,
      },
    ],
  });

  const text = (msg.content[0] as { type: string; text: string }).text;
  const json = JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] ?? "{}");
  return Response.json(json);
}
