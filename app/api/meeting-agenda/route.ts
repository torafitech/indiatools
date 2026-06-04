import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: Request) {
  const { title, duration, attendees, meetingType, topics } = await req.json();

  if (!title || !topics || !Array.isArray(topics) || topics.length === 0) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const client = new Anthropic();
  const msg = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1200,
    messages: [
      {
        role: "user",
        content: `Create a structured meeting agenda. Return ONLY valid JSON with this exact structure:
{
  "agenda": [{ "item": string, "duration": number (minutes), "owner": string, "notes": string }],
  "parkingLot": string (topics to defer if time runs short),
  "actionItemTemplate": string (2-3 line template for capturing action items)
}

Meeting details:
- Title: ${title}
- Type: ${meetingType}
- Total duration: ${duration} minutes
- Attendees: ${attendees} people
- Topics: ${topics.map((t: { topic: string; notes: string }) => `${t.topic}${t.notes ? ` (${t.notes})` : ""}`).join(", ")}

Rules: Always start with a brief "Welcome & Objectives" (2-5 min) and end with "Wrap-up & Next Steps" (5 min). Allocate time proportionally. Sum of all durations must equal exactly ${duration}. Owner should be "Facilitator", "Team", or a role like "PM", "Lead", "Speaker".`,
      },
    ],
  });

  const text = (msg.content[0] as { type: string; text: string }).text;
  const json = JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] ?? "{}");
  return Response.json(json);
}
